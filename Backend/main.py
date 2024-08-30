from fastapi import FastAPI
from database import engine, Base
from routers.empresa import router as empresa_router
from routers.empleados import router as empleado_router
app = FastAPI()


Base.metadata.create_all(bind=engine)


app.include_router(empresa_router)
app.include_router(empleado_router)
