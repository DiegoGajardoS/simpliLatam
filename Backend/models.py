from pydantic import BaseModel, EmailStr

class EmpresaBase(BaseModel):
    nombre: str
    direccion: str
    rut: str
    telefono: str

class EmpresaCreate(EmpresaBase):
    pass

class Empresa(EmpresaBase):
    id: int

    class Config:
        orm_mode = True

class EmpleadoBase(BaseModel):
    nombre_completo: str
    rut: str
    email: EmailStr
    id_empresa: int

class EmpleadoCreate(EmpleadoBase):
    pass

class Empleado(EmpleadoBase):
    id: int

    class Config:
        orm_mode = True
