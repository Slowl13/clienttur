import { BrowserRouter, Routes, Route } from 'react-router';
import AdminPanel from './pages/AdminPanel';
import MainPage from './pages/MainPage';

function App() {
  
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage/>}></Route>
          <Route path='/admin' element={<AdminPanel/>}></Route>
        </Routes>
      </BrowserRouter>
    );
}

export default App
