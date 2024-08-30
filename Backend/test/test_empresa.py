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

if SQLALCHEMY_DATABASE_URL is None:
    raise ValueError("TEST_DATABASE_URL no está configurada en el archivo .env")

engine = create_engine(SQLALCHEMY_DATABASE_URL)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db
client = TestClient(app)

@pytest.fixture(scope="function", autouse=True)
def setup_db():
    
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    yield

def test_create_empresa():
    response = client.post("/empresas/", json={
        "nombre": "Empresa Test",
        "direccion": "Direccion Test",
        "rut": "12345678-9",
        "telefono": "123456789"
    })
    assert response.status_code == 200
    data = response.json()
    assert data["nombre"] == "Empresa Test"

def test_read_empresa():
    response = client.post("/empresas/", json={
        "nombre": "Empresa Test 2",
        "direccion": "Direccion Test",
        "rut": "22345678-9",
        "telefono": "223456789"
    })
    empresa_id = response.json()["id"]
    
    response = client.get(f"/empresas/{empresa_id}")
    assert response.status_code == 200
    data = response.json()
    assert data["nombre"] == "Empresa Test 2"

def test_read_empresas():
    response = client.get("/empresas/")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)

def test_read_empleados_by_empresa():
    response = client.post("/empresas/", json={
        "nombre": "Empresa Test 3",
        "direccion": "Direccion Test",
        "rut": "32345678-9",
        "telefono": "323456789"
    })
    empresa_id = response.json()["id"]

    response = client.post("/empleados/", json={
        "nombre_completo": "Empleado Test",
        "rut": "87654321-0",
        "email": "empleado@test.com",
        "id_empresa": empresa_id
    })

    assert response.status_code == 200

    response = client.get(f"/empresas/{empresa_id}/empleados")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) > 0
