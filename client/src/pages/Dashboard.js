import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import Header from "../components/Header";

function Dashboard(props) {
  const { currentUser } = useAuth();

  const getPosts = async () => {
    const res = await axios.get("http://localhost:8080/api/posts");
    return res
  }

  useEffect(async () => {
    const posts = await getPosts();
    console.log(posts);
  }, []);
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
        <Header/>
      </header>
      <h1>Dashboard</h1>
    </div>
  );
}

export default Dashboard;
