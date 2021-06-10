import React from "react";
import { useData } from "../context/DataContext";
import Header from "../components/Header";
import PostCard from "../components/PostCard";
function Dashboard() {
  const { posts, setPosts } = useData();

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
          {posts?.map((post, i) => (
            <PostCard key={i} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
