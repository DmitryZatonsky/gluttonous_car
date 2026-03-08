import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import AddExpense from './pages/AddExpense';
import History from './pages/History';
import Statistics from './pages/Statistics';
import BottomNav from './components/BottomNav';


document.addEventListener('touchstart', (e) => {// Блокировка Pull-to-Refresh на уровне событий тача
  if (e.touches.length > 1) return; // Разрешаем зум (если надо)
}, { passive: false });

document.addEventListener('touchmove', (e) => {
  if (window.scrollY <= 0 && e.touches[0].pageY > 0) {// Если мы пытаемся тянуть вниз, когда скролл уже в самом верху. Не даем браузеру запустить обновление
    // e.preventDefault(); // Раскомментируй эту строку, если CSS не поможет
  }
}, { passive: false });

function App() {

  const [screen, setScreen] = useState("add");

  const screens = {
    add: <AddExpense />,
    history: <History />,
    statistics: <Statistics />
  };

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.25 }}
        >
          {screens[screen]}
        </motion.div>
      </AnimatePresence>
      <BottomNav screen={screen} setScreen={setScreen} />
    </>
  );
}

export default App
