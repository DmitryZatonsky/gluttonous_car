import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddExpense from './pages/AddExpense';
import History from './pages/History';
import Statistics from './pages/Statistics';
import BottomNav from './components/BottomNav';

// Блокировка Pull-to-Refresh на уровне событий тача
document.addEventListener('touchstart', (e) => {
  if (e.touches.length > 1) return; // Разрешаем зум (если надо)
}, { passive: false });

document.addEventListener('touchmove', (e) => {
  // Если мы пытаемся тянуть вниз, когда скролл уже в самом верху
  if (window.scrollY <= 0 && e.touches[0].pageY > 0) {
    // Не даем браузеру запустить обновление
    // e.preventDefault(); // Раскомментируй эту строку, если CSS не поможет
  }
}, { passive: false });

function App() {
  return (
    <>
      <BrowserRouter basename="/gluttonous_car">
        <Routes>
          <Route path='/' element={<AddExpense />} />
          <Route path='/history' element={<History />} />
          <Route path='/statistics' element={<Statistics />} />
        </Routes>

        <BottomNav />
      </BrowserRouter>
    </>
  );
}

export default App
