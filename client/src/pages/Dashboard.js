import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import Header from "../components/Header";
import PostCard from "../components/PostCard";
function Dashboard(props) {
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const res = await axios.get("http://localhost:8080/api/posts");
    return res.data;
  };

  useEffect(async () => {
    const posts = await getPosts();
    console.log(posts);
    setPosts(posts);
    console.log(posts);
  }, []);
  console.log(posts);
  console.log(currentUser);

  return (
    <div>
      <header
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Header posts={posts}/>
      </header>
      {posts?.map((post) => (
        <PostCard post={post} />
      ))}
    </div>
  );
}

export default Dashboard;
