import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Empresas.css';
import { Link } from 'react-router-dom';
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  CardFooter,
  Input,
  Button
} from '@material-tailwind/react';

function Empresas() {
  const [empresas, setEmpresas] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [company, setCompany] = useState({
    nombre: '',
    direccion: '',
    rut: '',
    telefono: '',
  });

  useEffect(() => {
    fetchEmpresas();
  }, []);

  const fetchEmpresas = () => {
    axios.get('http://localhost:8000/empresas/')
      .then(response => {
        setEmpresas(response.data);
      })
      .catch(error => {
        console.error("Hubo un error al obtener las empresas:", error);
      });
  };

  const handleChange = (e) => {
    setCompany({ ...company, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    axios.post('http://localhost:8000/empresas/', company)
      .then(response => {
        console.log('Empresa añadida:', response.data);
        setFormVisible(false);
        fetchEmpresas(); 
        resetForm(); 
      })
      .catch(error => {
        console.error('Error al añadir la empresa:', error);
      });
  };

  const resetForm = () => {
    setCompany({
      nombre: '',
      direccion: '',
      rut: '',
      telefono: '',
    });
  };

  return (

    <div className="empresas-container">
    <header>
          <nav>
            <Link to="/">Home</Link>
          </nav>
        </header>
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <Typography variant="h5" color="blue-gray">
              Listado de Empresas
            </Typography>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                <th className="p-4 border-b border-blue-gray-50">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Nombre
                  </Typography>
                </th>
                <th className="p-4 border-b border-blue-gray-50">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Dirección
                  </Typography>
                </th>
                <th className="p-4 border-b border-blue-gray-50">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    RUT
                  </Typography>
                </th>
                <th className="p-4 border-b border-blue-gray-50">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Teléfono
                  </Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              {empresas.map(empresa => (
                <tr key={empresa.id}>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {empresa.nombre}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {empresa.direccion}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {empresa.rut}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {empresa.telefono}
                    </Typography>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
        <CardFooter>
          <Button
            onClick={() => setFormVisible(!formVisible)}
            variant="gradient"
            className="custom-button"
          >
            {formVisible ? 'Cancelar' : 'Agregar Empresa'}
          </Button>


          {formVisible && (
            <div className="mt-4 bg-gray-900 p-4 rounded-lg">
              <Typography variant="h4" color="white" className="mb-4">
                Agregar Nueva Empresa
              </Typography>
              <div className="space-y-4">
                <div>
                  <Typography variant="small" color="white" className="mb-2 text-left font-medium">
                    Nombre
                  </Typography>
                  <Input
                    color="gray"
                    size="lg"
                    placeholder="e.g. ABC Corp"
                    name="nombre"
                    value={company.nombre}
                    onChange={handleChange}
                    className="bg-gray-700 placeholder:text-gray-400 text-white focus:border-blue-500"
                    containerProps={{ className: "!min-w-full" }}
                    labelProps={{ className: "hidden" }}
                  />
                </div>
                <div>
                  <Typography variant="small" color="white" className="mb-2 text-left font-medium">
                    Dirección
                  </Typography>
                  <Input
                    color="gray"
                    size="lg"
                    placeholder="e.g. 123 Main St"
                    name="direccion"
                    value={company.direccion}
                    onChange={handleChange}
                    className="bg-gray-700 placeholder:text-gray-400 text-white focus:border-blue-500"
                    containerProps={{ className: "!min-w-full" }}
                    labelProps={{ className: "hidden" }}
                  />
                </div>
                <div>
                  <Typography variant="small" color="white" className="mb-2 text-left font-medium">
                    RUT
                  </Typography>
                  <Input
                    color="gray"
                    size="lg"
                    placeholder="e.g. 12345678-9"
                    name="rut"
                    value={company.rut}
                    onChange={handleChange}
                    className="bg-gray-700 placeholder:text-gray-400 text-white focus:border-blue-500"
                    containerProps={{ className: "!min-w-full" }}
                    labelProps={{ className: "hidden" }}
                  />
                </div>
                <div>
                  <Typography variant="small" color="white" className="mb-2 text-left font-medium">
                    Teléfono
                  </Typography>
                  <Input
                    color="gray"
                    size="lg"
                    placeholder="e.g. +123456789"
                    name="telefono"
                    value={company.telefono}
                    onChange={handleChange}
                    className="bg-gray-700 placeholder:text-gray-400 text-white focus:border-blue-500"
                    containerProps={{ className: "!min-w-full" }}
                    labelProps={{ className: "hidden" }}
                  />
                </div>
                <Button
                  className="custom-button"
                  onClick={handleSubmit}
                >
                  Agregar Empresa
                </Button>
              </div>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

export default Empresas;
