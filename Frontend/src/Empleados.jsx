import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Empleados.css';
import { Link } from 'react-router-dom';

function Empleados() {
  const [empresas, setEmpresas] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [selectedEmpresa, setSelectedEmpresa] = useState('');
  const [nuevoEmpleado, setNuevoEmpleado] = useState({
    nombre_completo: '',
    rut: '',
    email: '',
  });

  
  useEffect(() => {
    async function fetchEmpresas() {
      try {
        const response = await axios.get('http://localhost:8000/empresas/');
        setEmpresas(response.data);
      } catch (error) {
        console.error('Error fetching empresas:', error);
      }
    }
    fetchEmpresas();
  }, []);

  
  useEffect(() => {
    if (selectedEmpresa) {
      async function fetchEmpleados() {
        try {
          const response = await axios.get(`http://localhost:8000/empresas/${selectedEmpresa}/empleados`);
          setEmpleados(response.data);
        } catch (error) {
          console.error('Error fetching empleados:', error);
        }
      }
      fetchEmpleados();
    }
  }, [selectedEmpresa]);

  
  const handleEmpresaChange = (event) => {
    setSelectedEmpresa(event.target.value);
  };

  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNuevoEmpleado({
      ...nuevoEmpleado,
      [name]: value,
    });
  };

  
  const handleAgregarEmpleado = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:8000/empleados/', { ...nuevoEmpleado, id_empresa: selectedEmpresa });
      
      
      const response = await axios.get(`http://localhost:8000/empresas/${selectedEmpresa}/empleados`);
      setEmpleados(response.data);
      
      
      setNuevoEmpleado({
        nombre_completo: '',
        rut: '',
        email: '',
      });
    } catch (error) {
      console.error('Error adding empleado:', error);
    }
  };

  return (
    <div>
      <header>
          <nav>
            <Link to="/">Home</Link>
          </nav>
        </header>
      <h2>Página de Empleados</h2>

      <label>
        Selecciona una empresa:
        <select value={selectedEmpresa} onChange={handleEmpresaChange}>
          <option value="">Selecciona una empresa</option>
          {empresas.map((empresa) => (
            <option key={empresa.id} value={empresa.id}>
              {empresa.nombre}
            </option>
          ))}
        </select>
      </label>

      <h3>Empleados</h3>
      <ul>
        {empleados.map((empleado) => (
          <li key={empleado.rut}>
            Nombre: {empleado.nombre_completo} | Rut: {empleado.rut} | email: {empleado.email}
          </li>
        ))}
      </ul>

      {selectedEmpresa && (
        <form onSubmit={handleAgregarEmpleado}>
          <h3>Agregar Empleado</h3>
          <label>
            Nombre Completo:
            <input
              type="text"
              name="nombre_completo"
              value={nuevoEmpleado.nombre_completo}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            RUT:
            <input
              type="text"
              name="rut"
              value={nuevoEmpleado.rut}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={nuevoEmpleado.email}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <button className="custom-button" type="submit">Agregar</button>
        </form>
      )}
    </div>
  );
}

export default Empleados;
