import React from "react";
import BarChartComp from "../components/BarChart";
import Header from "../components/Header";
import PieChartComp from "../components/PieChart";
import { useData } from "../context/DataContext";
const PIESTYLE = {

}
function Analystic(props) {
  const { posts, pieData, barData, newPosts, setPosts, setPieData } = useData();

  return (
    <>
      <Header />
      <div style={{display:"flex", justifyContent:"center", marginTop:"2rem"}}>
        <h1>Analystics</h1>
      </div>
      <div className="dashboard-data">
        <div className="charts">
          <div className ="barChart">
            <BarChartComp data={barData} />
          </div>
          <div className="pieChart">
            <PieChartComp data={pieData} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Analystic;
