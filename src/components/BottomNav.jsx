import { NavLink } from "react-router-dom";
import { PlusCircle, History, PieChart } from "lucide-react";

export default function BottomNav() {
    return (
        <nav className="bottom-nav">
            <NavLink to="/" className={({ isActive}) => (isActive ? 'nav-item active' : 'nav-item')}>
                <PlusCircle size={24} />
                <span>Добавить</span>
            </NavLink>

            <NavLink to='/history' className={({ isActive }) => ( isActive ? 'nav-item active' : 'nav-item')}>
                <History size={24} />
                <span>История</span>
            </NavLink>
            <NavLink to='/statistics' className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
                <PieChart size={24} />
                <span>Статистика</span>
            </NavLink>

        </nav>
    );
}