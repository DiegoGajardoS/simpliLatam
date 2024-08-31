# SimpliLatam

Bienvenido a **SimpliLatam**. Este repositorio contiene dos proyectos:

- **Backend**: Un proyecto en Python que proporciona una API RESTful.
- **Frontend**: Un proyecto en React que sirve como interfaz de usuario para interactuar con la API.

## Tabla de Contenidos

1. [Requisitos](#requisitos)
2. [Instalación](#instalación)
3. [Uso](#uso)
4. [Contacto](#contacto)
5. [Host](#host)

## Requisitos

### Backend

- Python 3.8 o superior
- Dependencias listadas en `requirements.txt`
- Base de datos postgresql, editable en .env
### Frontend

- Node.js 14 o superior
- Dependencias listadas en `package.json`

## Instalación

- **Clonar el repositorio**:

    ```bash
    git clone https://github.com/DiegoGajardoS/simpliLatam.git
    ```
### Backend

1. Navega a la carpeta del backend:

   ```bash
   cd Backend
   ```
2. **Crear un entorno virtual** (opcional pero recomendado):

    ```bash
    python -m venv env
    source env/bin/activate  # Para Unix/macOS
    .\env\Scripts\activate  # Para Windows
    ```
3. Instala dependencias
	```bash
    pip install -r requirements.txt 
    ```
### Frontend

1. Navega a la carpeta del frontend:

   ```bash
   cd Frontend
   ```
   
2. Instala dependencias
	```bash 
   npm install 
   ```
   

## Uso

### Backend

1. Ejecuta el servidor dentro del entorno creado 

   ```bash 
   uvicorn app.main:app --reload
   ```
### Frontend

1. Ejecuta el servidor dentro de la carpeta Frontend

   ```bash 
   npm start
   ```


### Instrucciones sobre cómo usar la aplicación después de la instalación local.

1. **Acceder a la API**:

    Abre tu navegador y ve a `http://127.0.0.1:8000` para ver la aplicación en acción.


2. **Documentación de la API**:

    La documentación interactiva de la API está disponible en `http://127.0.0.1:8000/docs`.


## Contacto

Información de contacto para preguntas o soporte adicional.

- **Autor**: Diego Gajardo
- **Email**: diego.gajardo.s@usach.cl
- **GitHub**: [github.com/DiegoGajardoS](https://github.com/DiegoGajardoS)


## Host

La aplicación está desplegada en AWS, utilizando EC2 y Nginx. Para acceder a la aplicación, visita `http://3.86.242.206` en tu navegador
