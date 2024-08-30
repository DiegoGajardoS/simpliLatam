import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Empresas from './Empresas';
import Empleados from './Empleados';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/empresas" element={<Empresas />} />
          <Route path="/empleados" element={<Empleados />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="menu">
      <h1>Tu Empleado Perfecto</h1>
      <Link to="/empresas">
        <button>Mis Empresas</button>
      </Link>
      <Link to="/empleados">
        <button>Mis Empleados</button>
      </Link>
    </div>
  );
}

export default App;
