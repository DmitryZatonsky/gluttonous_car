import { useState, useEffect } from 'react';
import { getExpenses } from '../utils/storage';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

// Цвета для секторов диаграммы
const COLORS = ['#d9008d', '#f29c11', '#4caf50', '#00bcd4', '#9c27b0', '#ff5722'];

export default function Statistics() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [stats, setStats] = useState({ costPerKm: 0, fuelPerKm: 0 });
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

    // 3. Поиск пробега
    const mileages = expenses.map(e => e.mileage).filter(m => m > 0);
    const maxMileage = Math.max(...mileages, 0);
    const minMileage = Math.min(...mileages, 0);
    const totalDistance = maxMileage - minMileage;

    // 4. Расчет за последние 30 дней
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const lastMonthExpenses = expenses.filter(e => new Date(e.date) > thirtyDaysAgo);
    const fuelLastMonth = lastMonthExpenses
      .filter(e => e.category === 'Топливо')
      .reduce((sum, e) => sum + e.amount, 0);
      
    const monthMileages = lastMonthExpenses.map(e => e.mileage).filter(m => m > 0);
    const monthDistance = Math.max(...monthMileages, 0) - Math.min(...monthMileages, 0);

    setTotal(totalSum);
    setData(chartData); // сгруппированные данные
    setStats({
      costPerKm: totalDistance > 0 ? (totalSum / totalDistance).toFixed(2) : 0,
      fuelPerKm: monthDistance > 0 ? (fuelLastMonth / monthDistance).toFixed(2) : 0
    });
  }, []);

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
      <div className="stats-grid">
        <div className="stat-box">
          <span className="stat-label">Стоимость км (все время)</span>
          <span className="stat-value">{stats.costPerKm} ₴/км</span>
        </div>
        <div className="stat-box">
          <span className="stat-label">Расход топлива (месяц)</span>
          <span className="stat-value">{stats.fuelPerKm} ₴/км</span>
        </div>
      </div>

    </div>
  );
}