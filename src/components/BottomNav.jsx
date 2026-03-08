import { PlusCircle, History, PieChart } from "lucide-react";

function BottomNav({ screen, setScreen }) {
    
    const getClass = (name) =>
    screen === name ? "nav-item active" : "nav-item";

  return (
    <div className="bottom-nav">

      <button
        onClick={() => setScreen("add")}
        className={getClass("add")}
      >
        <PlusCircle size={24} />
        <span>Добавить</span>
      </button>

      <button
        onClick={() => setScreen("history")}
        className={getClass("history")}
      >
        <History size={24} />
        <span>История</span>
      </button>

      <button
        onClick={() => setScreen("statistics")}
        className={getClass("statistics")}
      >
        <PieChart size={24} />
        <span>Статистика</span>
      </button>

    </div>
  );
}

export default BottomNav;