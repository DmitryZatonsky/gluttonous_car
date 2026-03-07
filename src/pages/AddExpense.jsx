import{ useState } from "react";
import { saveExpenses } from "../utils/storage";
import SuccessPopup from '../components/SuccessPopup';

const CATEGORIES = ['Топливо', 'ТО', 'Мойка', 'Запчасти', 'Ремонт', 'Страховка', 'Другое'];

export default function AddExpense() {
  // Состояние для полей формы
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
  const [category, setCategory] = useState('Топливо')
  const [mileage, setMileage] = useState('');
  const [amount, setAmount] = useState('');
  const [comment , setComment] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newExpense = {
      id: Date.now(),
      date,
      category,
      mileage: Number(mileage),
      amount: Number(amount),
      comment,
    };

    saveExpenses(newExpense);

    setShowSuccess(true); // Показываем кружок
    setTimeout(() => setShowSuccess(false), 1500);

    // Очищаем поля (кроме даты и категории)
    setMileage('');
    setAmount('');
    setComment('');
  };

  return (
    <>
      <div className="page-container">
        <h2 className="page-title">Новый расход</h2>

        <form className="expense-form" onSubmit={handleSubmit}>
          <div>
            <label>Дата</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)} required />
          </div>

          <div className="input-group">
            <label>Категория</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}>
              {CATEGORIES.map((category) => <option key={category} value={category}>{category}</option>)}
            </select>
          </div>

          <div className="input-group">
            <label>Пробег (км)</label>
            <input
              type="number"
              placeholder="0"
              value={mileage}
              onChange={(e) => setMileage(e.target.value)} required />
          </div>

          <div className="input-group">
            <label>Сумма (грн)</label>
            <input
              type="number"
              placeholder="0,00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)} required />
          </div>

          <div className="input-group">
            <label>Комментарий</label>
            <textarea rows='3'
              placeholder="Что купили?"
              value={comment}
              onChange={(e) => setComment(e.target.value)} />
          </div>

          <button type="submit" className="submit-btn">Сохранить</button>
        </form>
      </div>
    <SuccessPopup isVisible={showSuccess} />
    </>
  );
}