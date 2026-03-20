import { useState, useEffect } from "react";
import { getExpenses } from "../utils/storage";
import { groupByCategory } from "../utils/chartData";
import { calcFuelStats } from "../utils/fuelStats";
import ExpensesChart from "../components/ExpensesChart";
import StatCards from "../components/StatCards";

export default function Statistics() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(6);

  useEffect(() => {
    const expenses = getExpenses();
    if (!expenses.length) return;

    setTotal(expenses.reduce((sum, item) => sum + item.amount, 0));

    setData(groupByCategory(expenses));
  }, []);

  const expenses = getExpenses();
  const sortExpenses = expenses.sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );

  const totalSum = expenses.reduce((sum, item) => sum + item.amount, 0);
  const mileages = expenses.map((e) => e.mileage).filter(Boolean);
  const maxMileage = Math.max(...mileages);
  const minMileage = Math.min(...mileages);
  const totalDistance = maxMileage - minMileage;
  const costPerKm = totalDistance
    ? (totalSum / totalDistance).toFixed(2)
    : "0.00";

  const fuelExpense = calcFuelStats(sortExpenses, limit);
  // const costPerFuelKm = fuelExpense.costPerKm;
  // const litersPer100 = fuelExpense.litersPer100.toFixed(1);
  const statsData = [
    { label: "Стоимость км", value: `${costPerKm} ₴/км` },
    { label: "Пройдено пути", value: `${totalDistance} км` },
    {
      label: "Бензин грн/км",
      value: `${fuelExpense.petrolCostPerKm.toFixed(2)} ₴/км`,
    },
    {
      label: "Газ грн/км",
      value: `${fuelExpense.gasCostPerKm.toFixed(2)} ₴/км`,
    },
    {
      label: "Бензин л/100 км",
      value: `${fuelExpense.petrolLitersPer100.toFixed(1)} л/100 км`,
    },
    {
      label: "Газ л/100 км",
      value: `${fuelExpense.gasLitersPer100.toFixed(1)} л/100 км`,
    },
  ];

  return (
    <div className="page-container">
      <h2 className="page-title">Статистика</h2>
      {/* Диаграмма с категориями */}
      <ExpensesChart data={data} total={total} />
      {/* Ввод количества заправок */}
      <div className="stat-input">
        <div className="stat-left">
          <span className="stat-label">Количество заправок</span>
        </div>

        <div className="stat-input-wrapper">
          <input
            type="number"
            value={limit}
            onChange={(e) => {
              const value = Math.max(2, Number(e.target.value));
              setLimit(value);
            }}
            min={2}
          />
        </div>
      </div>
      {/* Карточки статистики */}
      <div className="stats-grid">
        <StatCards stats={statsData} />
      </div>
    </div>
  );
}
