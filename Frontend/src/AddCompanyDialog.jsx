import React, { useState, useRef, useEffect } from 'react';
import {
  Input,
  Button,
  Dialog,
  Typography,
  DialogBody,
  DialogHeader,
  DialogFooter,
} from '@material-tailwind/react';
import axios from 'axios';
import { createPopper } from '@popperjs/core';

export function AddCompanyDialog({ onAddCompany }) {
  const [open, setOpen] = useState(false);
  const [company, setCompany] = useState({
    nombre: '',
    direccion: '',
    rut: '',
    telefono: '',
  });

  const buttonRef = useRef(null);
  const dialogRef = useRef(null);
  const [popperInstance, setPopperInstance] = useState(null);

  const handleOpen = () => setOpen(!open);

  const handleChange = (e) => {
    setCompany({ ...company, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    axios.post('http://localhost:8000/empresas/', company)
      .then(response => {
        console.log('Empresa añadida:', response.data);
        handleOpen(); 
        onAddCompany(); 
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

  useEffect(() => {
    if (open && buttonRef.current && dialogRef.current) {
      const instance = createPopper(buttonRef.current, dialogRef.current, {
        placement: 'bottom-start',
      });
      setPopperInstance(instance);
    }
  }, [open]);

  useEffect(() => {
    return () => {
      if (popperInstance) {
        popperInstance.destroy();
      }
    };
  }, [popperInstance]);

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="gradient"
        ref={buttonRef}
        className="bg-blue-500 hover:bg-blue-600"
      >
        Agregar Empresa
      </Button>
      <Dialog
        size="sm"
        open={open}
        handler={handleOpen}
        className="p-4 max-w-md mx-auto mt-20 bg-gray-900 text-white border border-gray-700 rounded-lg shadow-lg"
        ref={dialogRef}
      >
        <DialogHeader className="relative m-0 block bg-blue-600 text-white rounded-t-lg">
          <Typography variant="h4" color="white">
            Agregar Nueva Empresa
          </Typography>
        </DialogHeader>
        <DialogBody className="space-y-4 pb-6 bg-gray-800">
          <div>
            <Typography
              variant="small"
              color="white"
              className="mb-2 text-left font-medium"
            >
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
              containerProps={{
                className: "!min-w-full",
              }}
              labelProps={{
                className: "hidden",
              }}
            />
          </div>
          <div>
            <Typography
              variant="small"
              color="white"
              className="mb-2 text-left font-medium"
            >
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
              containerProps={{
                className: "!min-w-full",
              }}
              labelProps={{
                className: "hidden",
              }}
            />
          </div>
          <div>
            <Typography
              variant="small"
              color="white"
              className="mb-2 text-left font-medium"
            >
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
              containerProps={{
                className: "!min-w-full",
              }}
              labelProps={{
                className: "hidden",
              }}
            />
          </div>
          <div>
            <Typography
              variant="small"
              color="white"
              className="mb-2 text-left font-medium"
            >
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
              containerProps={{
                className: "!min-w-full",
              }}
              labelProps={{
                className: "hidden",
              }}
            />
          </div>
        </DialogBody>
        <DialogFooter className="bg-gray-800">
          <Button
            className="ml-auto bg-blue-500 hover:bg-blue-600 text-white"
            onClick={handleSubmit}
          >
            Agregar Empresa
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
