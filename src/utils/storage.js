const DB_NAME = 'car_expenses_db';

export const getExpenses = () => {
  try {
    const data = localStorage.getItem(DB_NAME);
    const parsed = data ? JSON.parse(data) : [];
    // Гарантируем, что всегда возвращаем массив
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
};

export const saveExpenses = (newExpense) => {
  const currentExpenses = getExpenses();
  // Создаем новый массив: новая запись в начало
  const updated = [newExpense, ...currentExpenses];
  localStorage.setItem(DB_NAME, JSON.stringify(updated));
};

export const deleteExpense = (id) => {
  const currentExpenses = getExpenses();
  const filtered = currentExpenses.filter(item => item.id !== id);
  localStorage.setItem(DB_NAME, JSON.stringify(filtered));
};