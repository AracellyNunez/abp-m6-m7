# Gestión de usuarios

Aplicación web desarrollada como entrega de la tarea del módulo 6. Permite administrar usuarios mediante una interfaz web y una API REST construida con Node.js y Express.

## Funcionalidades

- Visualizar la página principal y el listado de usuarios.
- Registrar nuevos usuarios.
- Consultar el perfil de un usuario.
- Actualizar los datos de un usuario.
- Eliminar usuarios.
- Buscar usuarios por ID o correo electrónico.
- Validar el formato del RUT.
- Evitar registros con correo electrónico o RUT duplicado.
- Registrar las acciones de creación, actualización y eliminación en `log.txt`.

## Tecnologías utilizadas

- Node.js
- Express 5
- Express Handlebars
- Handlebars
- Yargs
- UUID
- Moment
- Chalk
- HTML, CSS y JavaScript

## Requisitos

- Node.js instalado.
- npm instalado.

## Instalación

1. Clonar el repositorio y entrar en su carpeta:

   ```bash
   git clone https://github.com/AracellyNunez/abp-m6.git
   cd abp-m6
   ```

2. Instalar las dependencias:

   ```bash
   npm install
   ```

## Ejecución

Para iniciar el servidor en modo normal:

```bash
npm start -- --port 3000
```

Para iniciar el servidor en modo desarrollo, con reinicio automático al modificar archivos:

```bash
npm run dev
```

La aplicación quedará disponible en:

```text
http://localhost:3000
```

En modo desarrollo se utiliza el puerto `3001`:

```text
http://localhost:3001
```

El puerto indicado debe estar entre `3000` y `3010`.

## Vistas disponibles

| Ruta | Descripción |
| --- | --- |
| `/` | Página principal |
| `/users` | Listado de usuarios |
| `/users/add` | Formulario para crear un usuario |
| `/users/profile/:id` | Perfil de un usuario |
| `/users/update/:id` | Formulario para actualizar un usuario |

## API REST

La API utiliza el prefijo `/api/users`.

| Método | Ruta | Descripción |
| --- | --- | --- |
| `GET` | `/api/users` | Obtener todos los usuarios |
| `GET` | `/api/users/:id` | Obtener un usuario por ID |
| `GET` | `/api/users/email/:email` | Obtener un usuario por correo |
| `POST` | `/api/users` | Crear un usuario |
| `PUT` | `/api/users/:id` | Actualizar un usuario |
| `DELETE` | `/api/users/:id` | Eliminar un usuario |

### Body para crear o actualizar

```json
{
  "firstname": "Nombre",
  "lastname": "Apellido",
  "email": "correo@ejemplo.com",
  "rut": "12.345.678-9"
}
```

Los campos requeridos para crear un usuario son `firstname`, `lastname`, `email` y `rut`. El RUT puede utilizar el formato `12.345.678-9` o `12345678-9`.

Ejemplo de consulta con `curl`:

```bash
curl http://localhost:3000/api/users
```

## Persistencia de datos

Los usuarios se almacenan localmente en:

```text
src/data/users.json
```

Las acciones realizadas se agregan al archivo:

```text
log.txt
```

No se utiliza una base de datos externa.

## Estructura principal

```text
.
├── public/                 # Archivos estáticos, estilos, imágenes y JavaScript
├── src/
│   ├── controllers/        # Lógica de usuarios y vistas
│   ├── data/               # Archivo JSON con los usuarios
│   ├── middlewares/        # Validación del body de las solicitudes
│   ├── models/             # Modelo User y operaciones CRUD
│   ├── routes/             # Rutas de la API y de las vistas
│   ├── utils/              # Lectura, escritura y registro de eventos
│   └── views/              # Plantillas Handlebars
├── server.js               # Punto de entrada del servidor
├── package.json            # Dependencias y scripts
└── log.txt                 # Registro de operaciones
```

## Autoría

- **Nombre:** Aracelly Núñez
- **Email:** nunezaracelly@gmail.com
- **GitHub:** https://github.com/AracellyNunez
- **Repositorio:** https://github.com/AracellyNunez/abp-m6