from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import engine, Base, SessionLocal
import models, crud

app = FastAPI()

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/empresas/", response_model=models.Empresa)
def create_empresa(empresa: models.EmpresaCreate, db: Session = Depends(get_db)):
    db_empresa = crud.create_empresa(db=db, empresa=empresa)
    return db_empresa

@app.get("/empresas/{empresa_id}", response_model=models.Empresa)
def read_empresa(empresa_id: int, db: Session = Depends(get_db)):
    db_empresa = crud.get_empresa(db=db, empresa_id=empresa_id)
    if db_empresa is None:
        raise HTTPException(status_code=404, detail="Empresa not found")
    return db_empresa

@app.get("/empresas/", response_model=list[models.Empresa])
def read_empresas(db: Session = Depends(get_db)):
    return crud.get_empresas(db=db)

@app.post("/empleados/", response_model=models.Empleado)
def create_empleado(empleado: models.EmpleadoCreate, db: Session = Depends(get_db)):
    db_empleado = crud.create_empleado(db=db, empleado=empleado)
    if db_empleado is None:
        raise HTTPException(status_code=404, detail="Empresa not found")
    return db_empleado

@app.get("/empleados/{empleado_id}", response_model=models.Empleado)
def read_empleado(empleado_id: int, db: Session = Depends(get_db)):
    db_empleado = crud.get_empleado(db=db, empleado_id=empleado_id)
    if db_empleado is None:
        raise HTTPException(status_code=404, detail="Empleado not found")
    return db_empleado

@app.get("/empresas/{empresa_id}/empleados", response_model=list[models.Empleado])
def read_empleados_by_empresa(empresa_id: int, db: Session = Depends(get_db)):
    # Verify that the empresa exists
    if not crud.get_empresa(db=db, empresa_id=empresa_id):
        raise HTTPException(status_code=404, detail="Empresa not found")
    return crud.get_empleados_by_empresa(db=db, empresa_id=empresa_id)
