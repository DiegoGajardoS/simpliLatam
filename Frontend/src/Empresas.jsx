import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  CardFooter,
} from '@material-tailwind/react';
import { AddCompanyDialog } from './AddCompanyDialog'; 

function Empresas() {
  const [empresas, setEmpresas] = useState([]);
  const buttonRef = useRef(null);

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

  const handleAddCompany = () => {
    fetchEmpresas(); 
  };

  return (
    <div className="empresas-container">
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Listado de Empresas
              </Typography>
            </div>
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
          <AddCompanyDialog onAddCompany={handleAddCompany} anchorRef={buttonRef} />
        </CardFooter>
      </Card>
    </div>
  );
}

export default Empresas;
