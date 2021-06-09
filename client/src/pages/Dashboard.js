import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import axios from "axios";
import Header from "../components/Header";
import PostCard from "../components/PostCard";
import io from "socket.io-client";
import PieChartComp from "../components/PieChart";
import BarChartComp from "../components/BarChart";

function Dashboard(props) {
  const ENDPOINT = "http://localhost:8080";
  const { currentUser } = useAuth();
  const { posts, pieData, barData, newPosts, setPosts, setPieData } = useData();

  // useEffect(async () => {
  //   getPieData();
  //   const interval = setInterval(() => {
  //     getPieData();
  //   }, 60000);
  //   return () => clearInterval(interval);
  // }, []);
  const getPosts = async () => {
    const res = await axios.get("http://localhost:8080/api/posts");
    return res.data;
  };
  const getPieData = async () => {
    const res = await axios.get("http://localhost:8080/api/chart/pie");
    return res.data;
  };

  useEffect(async () => {
    const posts = await getPosts();
    const pieChart = await getPieData();
    console.log(pieChart);
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
