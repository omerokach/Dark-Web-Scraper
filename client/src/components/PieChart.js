import React, { useCallback, useState } from "react";
import { PieChart, Pie, Cell, Bar } from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#ff5050",
  "#99ff99",
];
const TAGS = ["money", "other", "dataBase", "sexual", "violence"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
export default function PieChartComp({ data }) {
  return (
    <div>
      <div className="tagsColor" style={{display:"flex"}}>
        {TAGS.map((tag, i) => (
          <span>
            <div
              style={{
                width: "20px",
                height: "20px",
                margin: "2rem",
                border: "1px solid rgba(0, 0, 0, .2)",
                backgroundColor: `${COLORS[i]}`
              }}
            ></div>
            {tag}
          </span>
        ))}
      </div>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx={200}
          cy={200}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#FFBB28"
          dataKey="value"
        >
          {data.map((entry, index) => {
            console.log(entry);
            if (entry.value === 0) {
              return;
            } else {
              return (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              );
            }
          })}
        </Pie>
      </PieChart>
    </div>
  );
}
