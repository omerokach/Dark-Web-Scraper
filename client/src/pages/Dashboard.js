import React, { useEffect, useState } from "react";
import { useData } from "../context/DataContext";
import Header from "../components/Header";
import PostCard from "../components/PostCard";
function Dashboard() {
  const { posts, searchedPosts } = useData();
  const [mapPostsOf, setmapPostsOf] = useState("all");
  useEffect(() => {
    if (posts.length === 0) {
      setmapPostsOf("none");
    } else {
      if (searchedPosts.length !== 0) {
        setmapPostsOf("searched");
      } else {
        setmapPostsOf("all");
      }
    }
  }, [searchedPosts, posts]);

  return (
    <div>
      <header
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Header />
      </header>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "2rem",
        }}
      >
        <h1>Dashboard</h1>
      </div>
      <div className="dashboard-data">
        <div className="posts">
          {mapPostsOf === "none"
            ? null
            : mapPostsOf === "all"
            ? posts.map((post, i) => <PostCard key={i} post={post} />)
            : searchedPosts.map((post, i) => <PostCard key={i} post={post} />)}
          {/* {posts?.map((post, i) => (
            <PostCard key={i} post={post} />
          ))} */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
