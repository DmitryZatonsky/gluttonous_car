import { useState, useEffect } from 'react';
import { getExpenses } from '../utils/storage';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

// Цвета для секторов диаграммы
const COLORS = ['#d9008d', '#f29c11', '#4caf50', '#00bcd4', '#9c27b0', '#ff5722'];

export default function Statistics() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const expenses = getExpenses();
  const sortExpenses = expenses.sort((a, b) => new Date(b.date) - new Date(a.date));
  const totalSum = expenses.reduce((sum, item) => sum + item.amount, 0).toFixed(0); // общая сумма
  const mileages = expenses.map(e => e.mileage).filter(m => m > 0); 
  const maxMileage = Math.max(...mileages);
  const minMileage = Math.min(...mileages);
  const totalDistance = maxMileage - minMileage; // общий пробег
  const costPerKm = totalDistance ? (totalSum / totalDistance).toFixed(2) : 0; // стоимость километра всего 

  useEffect(() => {
    const expenses = getExpenses(); 
    if (expenses.length === 0) return; 
    
    // 1. Считаем общую сумму
    const totalSum = expenses.reduce((sum, item) => sum + item.amount, 0);
    setTotal(totalSum);

    // 2. Группируем по категориям для диаграммы
    const chartData = expenses.reduce((acc, item) => {
      const existing = acc.find(c => c.name === item.category);
      if (existing) {
        existing.value += item.amount;
      } else {
        acc.push({ name: item.category, value: item.amount });
      }
      return acc;
    }, []);
    
    setData(chartData); // для рендеринга массива категорий и сумм
  }, []);

  // средняя стоимость за км от 2 до 5 последних заправок
  const calcFuelExpense = expenses => {
    const r = expenses.reduce((acc, e) => {
      if (e.category !== "Топливо" || acc.count >= 5) return acc;
      
      acc.sum += e.amount;
      acc.minMileage = Math.min(acc.minMileage, e.mileage);
      acc.maxMileage = Math.max(acc.maxMileage, e.mileage);
      acc.count++;
      
      return acc;
    }, {
      sum: 0,
      minMileage: Infinity,
      maxMileage: -Infinity,
      count: 0
    });
    
    if (r.count < 2) return null;
    
    const distance = r.maxMileage - r.minMileage;
    
    return distance ? (r.sum / distance).toFixed(2) : null;
  };
  
  const fuelExpense = calcFuelExpense(sortExpenses); // грн/км расход топлива

  return (
    <div className="page-container">
      <h2 className="page-title">Статистика</h2>

      <div className="stats-card">
        <div className="chart-container" style={{ width: '100%', height: 300, position: 'relative' }}>
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
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#232035', border: 'none', borderRadius: '8px', color: '#fff' }}
                itemStyle={{ color: '#fff' }}
              />
            </PieChart>
          </ResponsiveContainer>
          
          {/* Сумма в центре диаграммы */}
          <div className="chart-center-text">
            <span className="total-label">Всего</span>
            <span className="total-amount">{total.toLocaleString()} ₴</span>
          </div>
        </div>
      </div>

      {/* Список категорий под графиком */}
      <div className="category-legend">
        {data.map((entry, index) => (
          <div key={entry.name} className="legend-item">
            <div className="legend-info">
              <span className="dot" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
              <span className="label">{entry.name}</span>
            </div>
            <span className="value">{entry.value.toLocaleString()} ₴</span>
          </div>
        ))}
      </div>

      {/* Обновленные карточки */}
      <div className="stats-grid margin-bottom">
        <div className="stat-box">
          <span className="stat-label">Стоимость км</span>
          <span className="stat-value">{costPerKm} ₴/км</span>
          {/* {console.log(stats.costPerKm)}; */}
        </div>
        <div className="stat-box">
          <span className="stat-label">до 5 заправок</span>
          <span className="stat-value">{fuelExpense} ₴/км</span>
          {/* {console.log(expenses)} */}
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-box">
          <span className="stat-label">Пройдено пути</span>
          <span className="stat-value">{totalDistance}</span>
        </div>
        <div className="stat-box">
          <span className="stat-label">Всего потрачено</span>
          <span className="stat-value">
            {totalSum} ₴
          </span>
        </div>
      </div>
    </div>
  );
}