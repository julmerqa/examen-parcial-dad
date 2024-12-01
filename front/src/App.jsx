import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Categoria from './pages/Categoria';
import Producto from './pages/Producto';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/categoria' element={<Categoria />}/>
        <Route path='/producto' element={<Producto />}/>
      </Routes>
    </Router>
  );
}

export default App;