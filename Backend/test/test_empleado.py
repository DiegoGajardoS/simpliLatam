import pytest
from fastapi.testclient import TestClient
from main import app  
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database import Base, get_db
import os
from dotenv import load_dotenv

load_dotenv()

SQLALCHEMY_DATABASE_URL = os.getenv("TEST_DATABASE_URL")
engine = create_engine(SQLALCHEMY_DATABASE_URL)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

@pytest.fixture(autouse=True)
def clean_db():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    yield

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db
client = TestClient(app)

def test_create_empleado():
    response = client.post("/empresas/", json={
        "nombre": "Empresa Test",
        "direccion": "Direccion Test",
        "rut": "12345678-9",  
        "telefono": "123456789"
    })
    empresa_id = response.json()["id"]

    response = client.post("/empleados/", json={
        "nombre_completo": "Empleado Test",
        "rut": "87654321-0",
        "email": "empleado@test.com",
        "id_empresa": empresa_id
    })
    assert response.status_code == 200
    data = response.json()
    assert data["nombre_completo"] == "Empleado Test"

def test_read_empleado():
    response = client.post("/empresas/", json={
        "nombre": "Empresa Test",
        "direccion": "Direccion Test",
        "rut": "98765432-1",  
        "telefono": "987654321"
    })
    empresa_id = response.json()["id"]

    response = client.post("/empleados/", json={
        "nombre_completo": "Empleado Test",
        "rut": "12345678-9",
        "email": "empleado@test.com",
        "id_empresa": empresa_id
    })
    empleado_id = response.json()["id"]
    
    response = client.get(f"/empleados/{empleado_id}")
    assert response.status_code == 200
    data = response.json()
    assert data["nombre_completo"] == "Empleado Test"
