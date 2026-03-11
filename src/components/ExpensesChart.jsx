import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { generateColors } from "../utils/colors";

export default function ExpensesChart({ data, total }) {
  const colors = generateColors(data.map((d) => d.name));
  return (
    <>
      <div className="stats-card">
        <div
          className="chart-container"
          style={{ width: "100%", height: 300, position: "relative" }}
        >
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                innerRadius={70}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                    stroke="none"
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#232035",
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff",
                }}
                itemStyle={{ color: "#fff" }}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="chart-center-text">
            <span className="total-amount">{total.toLocaleString()} ₴</span>
          </div>
        </div>
      </div>
      {/* Список категорий */}
      <div className="category-legend">
        {data.map((entry, index) => (
          <div key={entry.name} className="legend-item">
            <div className="legend-info">
              <span
                className="dot"
                style={{
                  backgroundColor: colors[index % colors.length],
                }}
              />
              <span className="label">{entry.name}</span>
            </div>
            <span className="value">{entry.value.toLocaleString()} ₴</span>
          </div>
        ))}
      </div>
    </>
  );
}
