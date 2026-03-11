import React from "react";

export default function StatCards({ stats }) {
  return (
    <div className="stats-container">
      {stats.map((item, index) => (
        <div key={index} className="stat-box">
          <span className="stat-label">{item.label}</span>
          <span className="stat-value">{item.value}</span>
        </div>
      ))}
    </div>
  );
}