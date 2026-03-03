import React, { useEffect, useState } from "react";
import "../App.css";

function Empleados() {
  const [empleados, setEmpleados] = useState([]);
  const [nombre, setNombre] = useState("");
  const [cargo, setCargo] = useState("");
  const [salario, setSalario] = useState("");
  const [office, setOffice] = useState("");
  const [idEditar, setIdEditar] = useState(null);

  useEffect(() => {
    obtenerEmpleados();
  }, []);

  const obtenerEmpleados = async () => {
    const res = await fetch("http://localhost:3000/api/empleados");
    const data = await res.json();
    setEmpleados(data);
  };

  const crearOEditarEmpleado = async (e) => {
    e.preventDefault();

    if (!nombre || !cargo || !salario || !office) {
      alert("Todos los campos son obligatorios");
      return;
    }

    const empleadoData = {
      name: nombre,
      position: cargo,
      office: office,
      salary: salario,
    };

    if (idEditar) {
      // EDITAR
      await fetch(`http://localhost:3000/api/empleados/${idEditar}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(empleadoData),
      });
    } else {
      // CREAR
      await fetch("http://localhost:3000/api/empleados", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(empleadoData),
      });
    }

    limpiarFormulario();
    obtenerEmpleados();
  };

  const editarEmpleado = (empleado) => {
    setNombre(empleado.name);
    setCargo(empleado.position);
    setSalario(empleado.salary);
    setOffice(empleado.office);
    setIdEditar(empleado._id);
  };

  const eliminarEmpleado = async (id) => {
    await fetch(`http://localhost:3000/api/empleados/${id}`, {
      method: "DELETE",
    });

    obtenerEmpleados();
  };

  const limpiarFormulario = () => {
    setNombre("");
    setCargo("");
    setSalario("");
    setOffice("");
    setIdEditar(null);
  };
console.log("Empleados cargados:", empleados);

  return (
    <div className="container">
      <div className="card">
        <h2>Gestión de Empleados</h2>

        <form onSubmit={crearOEditarEmpleado} className="formulario">
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

          <input
            type="text"
            placeholder="Cargo"
            value={cargo}
            onChange={(e) => setCargo(e.target.value)}
          />

          <input
            type="number"
            placeholder="Salario"
            value={salario}
            onChange={(e) => setSalario(e.target.value)}
          />

          <input
            type="text"
            placeholder="Lugar"
            value={office}
            onChange={(e) => setOffice(e.target.value)}
          />

          <button type="submit" className="btn-guardar">
            {idEditar ? "Actualizar" : "Guardar"}
          </button>
        </form>
      </div>

      <div className="card">
        <h3>Lista de Empleados</h3>

        <table className="tabla">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Cargo</th>
              <th>Salario</th>
              <th>Lugar</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {empleados.map((empleado) => (
              <tr key={empleado._id}>
                <td>{empleado.name}</td>
                <td>{empleado.position}</td>
                <td>${empleado.salary}</td>
                <td>{empleado.office}</td>
                <td>
                  <button
                    className="btn-editar"
                    onClick={() => editarEmpleado(empleado)}
                  >
                    Editar
                  </button>

                  <button
                    className="btn-eliminar"
                    onClick={() => eliminarEmpleado(empleado._id)}
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

export default Empleados;

