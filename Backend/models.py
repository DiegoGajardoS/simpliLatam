from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Empresa(Base):
    __tablename__ = "empresas"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(255), nullable=False)
    direccion = Column(String(255))
    rut = Column(String(12), nullable=False, unique=True)
    telefono = Column(String(20))

    empleados = relationship("Empleado", back_populates="empresa")


class Empleado(Base):
    __tablename__ = "empleados"

    id = Column(Integer, primary_key=True, index=True)
    nombre_completo = Column(String(255), nullable=False)
    rut = Column(String(12), nullable=False, unique=True)
    email = Column(String(255), nullable=False, unique=True)
    id_empresa = Column(Integer, ForeignKey('empresas.id'), nullable=True)

    empresa = relationship("Empresa", back_populates="empleados")
