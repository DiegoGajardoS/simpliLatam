from sqlalchemy.orm import Session
from modelsSQL import Empresa as DB_Empresa, Empleado as DB_Empleado
from models import EmpresaCreate, EmpleadoCreate
from sqlalchemy.exc import IntegrityError

def create_empresa(db: Session, empresa: EmpresaCreate):
    
    existing_empresa = db.query(DB_Empresa).filter(DB_Empresa.rut == empresa.rut).first()
    if existing_empresa:
        raise ValueError("Una empresa con este RUT ya existe")

   
    db_empresa = DB_Empresa(
        nombre=empresa.nombre,
        direccion=empresa.direccion,
        rut=empresa.rut,
        telefono=empresa.telefono
    )
    db.add(db_empresa)
    try:
        db.commit()
        db.refresh(db_empresa)
    except IntegrityError:
        db.rollback()
        raise ValueError("Error al agregar la empresa, posiblemente debido a un conflicto de integridad")
    return db_empresa

def get_empresa(db: Session, empresa_id: int):
    return db.query(DB_Empresa).filter(DB_Empresa.id == empresa_id).first()

def get_empresas(db: Session):
    return db.query(DB_Empresa).all()

def create_empleado(db: Session, empleado: EmpleadoCreate):
    
    empresa = db.query(DB_Empresa).filter(DB_Empresa.id == empleado.id_empresa).first()
    if not empresa:
        return None
    
    
    existing_empleado = db.query(DB_Empleado).filter(
        DB_Empleado.rut == empleado.rut,
        DB_Empleado.id_empresa == empleado.id_empresa
    ).first()
    
    if existing_empleado:
        raise ValueError("Ya existe un empleado con este RUT en la empresa especificada")
    
    
    db_empleado = DB_Empleado(
        nombre_completo=empleado.nombre_completo,
        rut=empleado.rut,
        email=empleado.email,
        id_empresa=empleado.id_empresa
    )
    db.add(db_empleado)
    try:
        db.commit()
        db.refresh(db_empleado)
    except IntegrityError:
        db.rollback()
        raise ValueError("Error al agregar el empleado, posiblemente debido a un conflicto de integridad")
    
    return db_empleado

def get_empleado(db: Session, empleado_id: int):
    return db.query(DB_Empleado).filter(DB_Empleado.id == empleado_id).first()

def get_empleados_by_empresa(db: Session, empresa_id: int):
    return db.query(DB_Empleado).filter(DB_Empleado.id_empresa == empresa_id).all()
