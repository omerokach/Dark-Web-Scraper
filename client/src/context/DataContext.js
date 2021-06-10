import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

import io from "socket.io-client";
import { useAuth } from "./AuthContext";
const DataContext = React.createContext();

export function useData() {
  return useContext(DataContext);
}

export function DataProvider({ children }) {
  const ENDPOINT = "http://localhost:8080";
  const [posts, setPosts] = useState([]);
  const { currentUser } = useAuth();
  const [pieChart, setPieChart] = useState({
    type: "pie",
    dataBase: 0,
    money: 0,
    other: 0,
    sexual: 0,
    sumVals: 0,
    violence: 0,
  });
  const [pieData, setPieData] = useState([]);
  const [barData, setBarData] = useState([]);
  const [costumInterval, setCostumInterval] = useState(2);
  const [newPosts, setNewPosts] = useState([]);
  const [newPostsByKeyWords, setNewPostsByKeyWords] = useState(0);
  const getPosts = async () => {
    const res = await axios.get("http://localhost:8080/api/posts");
    return res.data;
  };

  const getPieData = async () => {
    const res = await axios.get(`http://localhost:8080/api/chart/pie`);
    return res.data;
  };

  const compareTagsAmount = (userTags, newPosts) => {
    let count = 0;
    userTags.forEach((tag) => {
      newPosts.forEach((postTag) => {
        if (tag === postTag);
        count++;
      });
    });
    return count;
  };

  const getIntervalForUser = async () => {
    const res = await axios.get(
      `http://localhost:8080/api/interval/${currentUser.email}`
    );
    return res.data;
  };

  const getUserKeyWords = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/user/key-words/${currentUser.email}`
      );
      return res.data.userKeyWords;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(async () => {
    if (currentUser) {
      const posts = await getPosts();
      const pieChart = await getPieData();
      const intervalRes = await getIntervalForUser(currentUser.email);
      const dataForPie = [
        { name: "money", value: pieChart.money },
        { name: "other", value: pieChart.other },
        { name: "dataBase", value: pieChart.dataBase },
        { name: "sexual", value: pieChart.sexual },
        { name: "violence", value: pieChart.violence },
      ];
      const dataForBar = [
        { name: "money", pv: pieChart.money, uv: 0, amt: 0 },
        { name: "other", pv: pieChart.other, uv: 0, amt: 0 },
        {
          name: "dataBase",
          pv: pieChart.dataBase,
          uv: 0,
          amt: 0,
        },
        { name: "sexual", pv: pieChart.sexual, uv: 0, amt: 0 },
        {
          name: "violence",
          pv: pieChart.violence,
          uv: 0,
          amt: 0,
        },
      ];
      setBarData(dataForBar);
      setPieData(dataForPie);
      setCostumInterval(intervalRes.interval);
      setPosts(posts);
    }
  }, [currentUser]);

  useEffect(() => {
    try {
      const socket = io(ENDPOINT);
      socket.on("newPosts", async (scraperStatus) => {
        console.log(scraperStatus);
        if (scraperStatus.pieData.sumVals !== pieChart.sumVals) {
          const dataForPie = [
            { name: "money", value: scraperStatus.pieData.money },
            { name: "other", value: scraperStatus.pieData.other },
            { name: "dataBase", value: scraperStatus.pieData.dataBase },
            { name: "sexual", value: scraperStatus.pieData.sexual },
            { name: "violence", value: scraperStatus.pieData.violence },
          ];
          const dataForBar = [
            { name: "money", pv: scraperStatus.pieData.money, uv: 0, amt: 0 },
            { name: "other", pv: scraperStatus.pieData.other, uv: 0, amt: 0 },
            {
              name: "dataBase",
              pv: scraperStatus.pieData.dataBase,
              uv: 0,
              amt: 0,
            },
            { name: "sexual", pv: scraperStatus.pieData.sexual, uv: 0, amt: 0 },
            {
              name: "violence",
              pv: scraperStatus.pieData.violence,
              uv: 0,
              amt: 0,
            },
          ];
          setBarData(dataForBar);
          setPieData(dataForPie);
          setPieChart(scraperStatus.pieData);
        }
        if (scraperStatus.newPostsLength !== 0) {
          const userKeyWords = await getUserKeyWords();
          const countIfHavePostWithKeys = compareTagsAmount(
            userKeyWords,
            scraperStatus.newPosts
          );
          console.log(countIfHavePostWithKeys);
          setNewPostsByKeyWords(countIfHavePostWithKeys);
          setNewPosts(scraperStatus.newPosts);
          setPosts((prev) => [...prev, scraperStatus.newPosts]);
        }
      });
      return () => socket.close();
    } catch (error) {
      console.log(error);
    }
  }, [ENDPOINT]);

  const value = {
    newPostsByKeyWords,
    costumInterval,
    setCostumInterval,
    setPosts,
    setPieData,
    pieData,
    barData,
    newPosts,
    posts,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
