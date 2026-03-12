import { useState, useEffect } from "react";
import { getExpenses, deleteExpense } from "../utils/storage";
import { Trash2, Calendar, Gauge, CreditCard } from "lucide-react";
import Modal from '../components/modal/Modal';

export default function History() {
  const [expenses, setExpenses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const sortExpenses = expenses.sort((a, b) => new Date(b.date) - new Date(a.date)); // сортировка карточек по датам

  // Загружаем данные при входе на страницу
  useEffect(() => {
    setExpenses(getExpenses());
  }, []);

  const confirmDelete = (id) => {
    setSelectedId(id); 
    setIsModalOpen(true); 
  };

  const handleConfirm = () => {
  deleteExpense(selectedId); // используем ID из штата
  setExpenses(getExpenses()); // обновляем список
  setIsModalOpen(false); // закрываем окно
};

  return (
    <>
      <div className="page-container">
        <h2 className="page-title">История</h2>

        {expenses.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', textAlign: 'center' }}>Нет данных</p>
        ) : (
          <div className="expense-list">
            {sortExpenses.map((item) => (
              <div key={item.id} className="expense-card">  
                <div className="card-header">
                  <span className="category-badge">{item.category}</span>
                  <button onClick={() => confirmDelete(item.id)} className="delete-btn">
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="card-body">
                  <div className="info-row">
                    <Calendar size={16} color="var(--accent-orange)" />
                    <span>{item.date}</span>
                  </div>
                  <div className="info-row">
                    <Gauge size={16} color="var(--accent-pink)" />
                    <span>{item.mileage} км</span>
                  </div>
                  <div className="info-row">
                    <CreditCard size={16} color="#4caf50" />
                    <span>{item.amount} грн</span>
                  </div>
                </div>

                {item.comment && (<p className="card-comment">{item.comment}</p>)}
              </div>
            ))}
          </div>
        )}
      </div><Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={ handleConfirm }
          title="Удаление"
          message="Ты уверен, что хочешь удалить эту запись?" />
    </>
  );
}