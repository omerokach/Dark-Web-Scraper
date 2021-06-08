import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import Header from "../components/Header";
import PostCard from "../components/PostCard";
import io from "socket.io-client";

function Dashboard(props) {
  const ENDPOINT = "http://localhost:8080";
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState([]);
  const [keyWords, setKeyWords] = useState([]);
  const [newPosts, setNewPosts] = useState([]);
  const getPosts = async () => {
    const res = await axios.get("http://localhost:8080/api/posts");
    return res.data;
  };

  useEffect(() => {
    try {
      const socket = io(ENDPOINT);
      socket.on("newPosts", (scraperStatus) => {
        console.log(scraperStatus);
        if(scraperStatus.newPostsLength !== 0){
          setNewPosts(scraperStatus.newPosts)
        }
      })
      return () => socket.close();
    } catch (error) {
      console.log(error);
    }
  }, [ENDPOINT]);

  useEffect(async () => {
    const posts = await getPosts();
    setPosts(posts);
  }, []);

  return (
    <div>
      <header
        style={{  
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Header posts={posts} newPosts={newPosts}/>
      </header>
      {posts?.map((post, i) => (
        <PostCard key={i} post={post} />
      ))}
    </div>
  );
}

export default Dashboard;
