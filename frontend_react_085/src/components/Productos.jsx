import React, { useEffect, useState } from "react";
import "../App.css";
import logo from "../Doc1_page-0001.jpg";



function Productos() {
  const [idEditar, setIdEditar] = useState(null);
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [tipo, setTipo] = useState("");

  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {
    const res = await fetch("http://localhost:3000/api/productos");
    const data = await res.json();
    setProductos(data);
  };

  const editarProducto = (producto) => {
    setNombre(producto.nombre);
    setDescripcion(producto.descripcion);
    setPrecio(producto.precio);
    setTipo(producto.tipo);
    setIdEditar(producto._id);
  };

  const guardarProducto = async (e) => {
    e.preventDefault();

    if (!nombre || !descripcion || !precio || !tipo) {
      alert("Todos los campos son obligatorios");
      return;
    }

    if (idEditar) {
      // EDITAR
      await fetch(`http://localhost:3000/api/productos/${idEditar}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, descripcion, precio, tipo }),
      });
      setIdEditar(null);
    } else {
      // CREAR
      await fetch("http://localhost:3000/api/productos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, descripcion, precio, tipo }),
      });
    }

    setNombre("");
    setDescripcion("");
    setPrecio("");
    setTipo("");

    obtenerProductos();
  };

  const eliminarProducto = async (id) => {
    const confirmar = window.confirm("¿Seguro que deseas eliminar este producto?");
    if (!confirmar) return;

    await fetch(`http://localhost:3000/api/productos/${id}`, {
      method: "DELETE",
    });

    obtenerProductos();
  };

  return (
    <div className="container">
      <img src={logo} alt="Missie logo" className="logo" />
      <h1 className="titulo">Gestión Missie</h1>

      <div className="card">
        <h2>
          {idEditar ? "Editar Producto / Servicio" : "Agregar Producto / Servicio"}
        </h2>

        <form onSubmit={guardarProducto} className="formulario">
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

          <input
            type="text"
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />

          <input
            type="number"
            placeholder="Precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
          />

          <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="">Seleccione tipo</option>
            <option value="Producto">Producto</option>
            <option value="Servicio">Servicio</option>
          </select>

          <button type="submit" className="btn-guardar">
            {idEditar ? "Actualizar" : "Guardar"}
          </button>
        </form>
      </div>

      <div className="card">
        <h2>Lista de Productos</h2>

        {productos.length === 0 ? (
          <p>No hay productos</p>
        ) : (
          <table className="tabla">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Tipo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto) => (
                <tr key={producto._id}>
                  <td>{producto.nombre}</td>
                  <td>{producto.descripcion}</td>
                  <td>${producto.precio}</td>
                  <td>{producto.tipo}</td>
                  <td>
                    <button
                      className="btn-editar"
                      onClick={() => editarProducto(producto)}
                    >
                      Editar
                    </button>

                    <button
                      className="btn-eliminar"
                      onClick={() => eliminarProducto(producto._id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Productos;


