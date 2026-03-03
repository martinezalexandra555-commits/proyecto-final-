import { Routes, Route, Link } from "react-router-dom";
import Productos from "./components/Productos";
import Usuarios from "./components/Usuarios";
import Empleados from "./components/Empleados";
import "./App.css";

function App() {
  return (
    <div>
      <nav className="menu">
        <h2 className="logo-menu">Missie</h2>

        <div className="menu-links">
          <Link to="/">Productos</Link>
          <Link to="/usuarios">Usuarios</Link>
          <Link to="/empleados">Empleados</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Productos />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/empleados" element={<Empleados />} />
      </Routes>
    </div>
  );
}

export default App;
