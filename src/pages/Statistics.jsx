import { useState, useEffect } from 'react';
import { getExpenses } from '../utils/storage';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

// Цвета для секторов диаграммы в стиле твоего дизайна
const COLORS = ['#d9008d', '#f29c11', '#4caf50', '#00bcd4', '#9c27b0', '#ff5722'];

export default function Statistics() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const expenses = getExpenses();
    
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

    setData(chartData);
  }, []);

  return (
    <div className="page-container">
      <h2 className="page-title">Статистика</h2>

      <div className="stats-card">
        <div className="chart-container" style={{ width: '100%', height: '300px', position: 'relative' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={70}  // Делаем "дырку" посередине
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#232035', border: 'none', borderRadius: '8px' }}
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

      <div className="stats-grid">
        <div className="stat-box">
          <span className="stat-label">Трат всего</span>
          <span className="stat-value">{data.length}</span>
        </div>
        <div className="stat-box">
          <span className="stat-label">Средний чек</span>
          <span className="stat-value">
            {data.length > 0 ? Math.round(total / getExpenses().length) : 0} ₴
          </span>
        </div>
      </div>
    </div>
  );
}