from fastapi import FastAPI
from database import engine, Base
from routers.empresa import router as empresa_router
from routers.empleados import router as empleado_router
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()


origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)
Base.metadata.create_all(bind=engine)


app.include_router(empresa_router)
app.include_router(empleado_router)
