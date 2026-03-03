import React, { useEffect, useState } from "react";
import "../App.css";

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [idEditar, setIdEditar] = useState(null);

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const obtenerUsuarios = async () => {
    const res = await fetch("http://localhost:3000/api/usuarios");
    const data = await res.json();
    setUsuarios(data);
  };

  const crearOEditarUsuario = async (e) => {
    e.preventDefault();

    if (!nombre || !email || !password) {
      alert("Todos los campos son obligatorios");
      return;
    }

    const usuarioData = {
      nombre,
      email,
      password,
    };

    if (idEditar) {
      await fetch(`http://localhost:3000/api/usuarios/${idEditar}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuarioData),
      });
    } else {
      await fetch("http://localhost:3000/api/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuarioData),
      });
    }

    limpiarFormulario();
    obtenerUsuarios();
  };

  const editarUsuario = (usuario) => {
    setNombre(usuario.nombre);
    setEmail(usuario.email);
    setPassword(usuario.password);
    setIdEditar(usuario._id);
  };

  const eliminarUsuario = async (id) => {
    await fetch(`http://localhost:3000/api/usuarios/${id}`, {
      method: "DELETE",
    });

    obtenerUsuarios();
  };

  const limpiarFormulario = () => {
    setNombre("");
    setEmail("");
    setPassword("");
    setIdEditar(null);
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Gestión de Usuarios</h2>

        <form onSubmit={crearOEditarUsuario} className="formulario">
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="btn-guardar">
            {idEditar ? "Actualizar" : "Guardar"}
          </button>
        </form>
      </div>

      <div className="card">
        <h3>Lista de Usuarios</h3>

        <table className="tabla">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario._id}>
                <td>{usuario.nombre}</td>
                <td>{usuario.email}</td>
                
                <td>
                  <button
                    className="btn-editar"
                    onClick={() => editarUsuario(usuario)}
                  >
                    Editar
                  </button>

                  <button
                    className="btn-eliminar"
                    onClick={() => eliminarUsuario(usuario._id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Usuarios;