import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddExpense from './pages/AddExpense';
import History from './pages/History';
import Statistics from './pages/Statistics';
import BottomNav from './components/BottomNav';


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
