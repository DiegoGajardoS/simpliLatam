from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from crud import create_empresa as crud_create_empresa, get_empresa as crud_get_empresa, get_empresas as crud_get_empresas, get_empleados_by_empresa as crud_get_empleados_by_empresa
from models import Empresa, Empleado, EmpresaCreate
from database import get_db

router = APIRouter()

@router.post("/empresas/", response_model=Empresa)
def create_empresa(empresa: EmpresaCreate, db: Session = Depends(get_db)):
    db_empresa = crud_create_empresa(db=db, empresa=empresa)
    return db_empresa

@router.get("/empresas/{empresa_id}", response_model=Empresa)
def read_empresa(empresa_id: int, db: Session = Depends(get_db)):
    db_empresa = crud_get_empresa(db=db, empresa_id=empresa_id)
    if db_empresa is None:
        raise HTTPException(status_code=404, detail="Empresa not found")
    return db_empresa

@router.get("/empresas/", response_model=list[Empresa])
def read_empresas(db: Session = Depends(get_db)):
    return crud_get_empresas(db=db)

@router.get("/empresas/{empresa_id}/empleados", response_model=list[Empleado])
def read_empleados_by_empresa(empresa_id: int, db: Session = Depends(get_db)):
    if not crud_get_empresa(db=db, empresa_id=empresa_id):
        raise HTTPException(status_code=404, detail="Empresa not found")
    return crud_get_empleados_by_empresa(db=db, empresa_id=empresa_id)
