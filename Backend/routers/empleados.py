from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from models import Empleado, EmpleadoCreate
from database import get_db
from crud import create_empleado as crud_create_empleado, get_empleado as crud_get_empleado
router = APIRouter()

@router.post("/empleados/", response_model=Empleado)
def create_empleado(empleado: EmpleadoCreate, db: Session = Depends(get_db)):
    try:
        db_empleado = crud_create_empleado(db=db, empleado=empleado)
        if db_empleado is None:
            raise HTTPException(status_code=404, detail="Empresa not found")
        return db_empleado
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

@router.get("/empleados/{empleado_id}", response_model=Empleado)
def read_empleado(empleado_id: int, db: Session = Depends(get_db)):
    db_empleado = crud_get_empleado(db=db, empleado_id=empleado_id)
    if db_empleado is None:
        raise HTTPException(status_code=404, detail="Empleado not found")
    return db_empleado

@router.get("/print")
def read_root():
    return {"Hello": "World"}