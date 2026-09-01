# Gestión de usuarios, fichas y exámenes

Aplicación web desarrollada como entrega de la tarea del módulo 6 y 7. Permite administrar usuarios, fichas y exámenes mediante una interfaz web y una API REST construida con Node.js, Express y PostgreSQL.

## Funcionalidades

### Gestión de Usuarios
- Visualizar la página principal y el listado de usuarios.
- Registrar nuevos usuarios.
- Consultar el perfil de un usuario.
- Actualizar los datos de un usuario.
- Eliminar usuarios.
- Buscar usuarios por ID o correo electrónico.
- Validar el formato del RUT.
- Evitar registros con correo electrónico o RUT duplicado.

### Gestión de Fichas
- Crear fichas asociadas a usuarios.
- Obtener listado de fichas.

### Gestión de Exámenes
- Crear exámenes.
- Obtener listado de exámenes.

### Registro y Logging
- Registrar las acciones de creación, actualización y eliminación en `log.txt`.

## Tecnologías utilizadas

- Node.js
- Express 5
- Express Handlebars
- Handlebars
- PostgreSQL
- Sequelize (ORM)
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

### Usuarios

La API utiliza el prefijo `/api/users`.

| Método | Ruta | Descripción |
| --- | --- | --- |
| `GET` | `/api/users` | Obtener todos los usuarios |
| `GET` | `/api/users/:id` | Obtener un usuario por ID |
| `GET` | `/api/users/email/:email` | Obtener un usuario por correo |
| `POST` | `/api/users` | Crear un usuario |
| `PUT` | `/api/users/:id` | Actualizar un usuario |
| `DELETE` | `/api/users/:id` | Eliminar un usuario |

### Fichas

La API utiliza el prefijo `/api/fichas`.

| Método | Ruta | Descripción |
| --- | --- | --- |
| `GET` | `/api/fichas` | Obtener todas las fichas |
| `POST` | `/api/fichas` | Crear una ficha |

### Exámenes

La API utiliza el prefijo `/api/examenes`.

| Método | Ruta | Descripción |
| --- | --- | --- |
| `GET` | `/api/examenes` | Obtener todos los exámenes |
| `POST` | `/api/examenes` | Crear un examen |

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

Los datos se almacenan en una base de datos PostgreSQL configurada con Sequelize como ORM.

Configuración de la base de datos:

```text
src/config/db.js
```

Modelos de datos:

```text
src/models/
├── User.model.js      # Modelo de usuarios
├── fichas.model.js    # Modelo de fichas
├── examen.model.js    # Modelo de exámenes
└── index.js           # Inicialización de modelos
```

Las acciones realizadas se agregan al archivo:

```text
log.txt
```

## Estructura principal

```text
.
├── public/                 # Archivos estáticos, estilos, imágenes y JavaScript
├── src/
│   ├── config/             # Configuración de la base de datos
│   ├── controllers/        # Lógica de usuarios, fichas y exámenes
│   ├── data/               # Scripts SQL y colecciones Postman
│   ├── middlewares/        # Validación del body de las solicitudes
│   ├── models/             # Modelos Sequelize (User, Fichas, Exámenes)
│   ├── routes/             # Rutas de la API y de las vistas
│   ├── utils/              # Utilidades de lectura, escritura y logging
│   └── views/              # Plantillas Handlebars
├── server.js               # Punto de entrada del servidor
├── package.json            # Dependencias y scripts
└── log.txt                 # Registro de operaciones
```

## Autoría

- **Nombre:** Aracelly Núñez
- **Email:** nunezaracelly@gmail.com
- **GitHub:** https://github.com/AracellyNunez
- **Repositorio:** https://github.com/AracellyNunez/abp-m6-m7