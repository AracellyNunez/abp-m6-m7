# Sistema de gestión clínica

Aplicación web de gestión para pacientes, fichas médicas y exámenes, desarrollada con Node.js, Express, PostgreSQL y Sequelize. El proyecto incluye autenticación con JWT, vistas para administración y una API REST protegida.

## Funcionalidades principales

### Autenticación y seguridad
- Inicio de sesión con email y contraseña.
- Generación y validación de JWT para rutas protegidas.
- Middleware de autenticación para validar tokens en cada petición.
- Rutas públicas y privadas diferenciadas.
- Usuario administrador por defecto creado automáticamente.

### Gestión de usuarios
- Listado de pacientes.
- Registro de nuevos usuarios.
- Consulta de perfiles por ID.
- Edición de datos de usuario.
- Eliminación de usuarios.
- Búsqueda por email.
- Validación de email y RUT.
- Prevención de duplicados.
- Soporte de roles: `admin` y `patient`.

### Gestión de fichas médicas
- Creación de fichas asociadas a un usuario.
- Visualización de fichas en la interfaz.
- Asociación con el paciente correspondiente.

### Gestión de exámenes
- Registro de exámenes médicos.
- Asociación con pacientes.
- Listado de exámenes disponibles.

### Vistas web
- Login.
- Home principal.
- Listado de pacientes.
- Perfil del usuario.
- Formularios de creación y actualización.
- Vistas para fichas y exámenes.

### Base de datos
- Conexión a PostgreSQL con Sequelize.
- Sincronización automática de modelos.
- Verificación de columnas faltantes en la base de datos.
- Creación automática del usuario administrador si no existe.

## Tecnologías utilizadas

- Node.js
- Express 5
- Express Handlebars
- PostgreSQL
- Sequelize ORM
- JWT (jsonwebtoken)
- bcryptjs
- dotenv
- Express File Upload
- HTML, CSS y JavaScript
- Chalk
- Yargs

## Requisitos

- Node.js 18 o superior
- npm
- PostgreSQL corriendo localmente

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/tu-usuario/abp-m8-aracelly-nunez.git
cd abp-m8-aracelly-nunez
```

2. Instalar dependencias:

```bash
npm install
```

3. Asegurar que PostgreSQL esté activo y que la base de datos exista.

## Ejecución

Modo desarrollo con reinicio automático:

```bash
npm run dev
```

Modo normal:

```bash
npm start -- --port 3000
```

La aplicación queda disponible por defecto en:

```text
http://localhost:3001
```

El puerto debe estar entre `3000` y `3010`.

## Credenciales por defecto

El sistema crea automáticamente un administrador si no existe:

- Email: `admin@salud.cl`
- Contraseña: `admin123`

## Rutas principales

### Vistas web

| Ruta | Descripción |
| --- | --- |
| `/` | Login |
| `/login` | Login |
| `/home` | Inicio principal |
| `/users` | Listado de pacientes |
| `/users/add` | Agregar usuario |
| `/users/profile/:id` | Perfil del paciente |
| `/users/update/:id` | Actualizar usuario |
| `/examenes` | Listado de exámenes |
| `/fichas` | Listado de fichas |

### API REST

#### Autenticación

| Método | Ruta | Descripción |
| --- | --- | --- |
| `POST` | `/api/login` | Iniciar sesión |
| `POST` | `/api/auth` | Ruta alternativa de autenticación |

#### Usuarios

| Método | Ruta | Descripción |
| --- | --- | --- |
| `GET` | `/api/users` | Obtener todos los pacientes |
| `GET` | `/api/users/:id` | Obtener usuario por ID |
| `GET` | `/api/users/email/:email` | Obtener usuario por email |
| `POST` | `/api/users` | Crear usuario |
| `PUT` | `/api/users/:id` | Actualizar usuario |
| `DELETE` | `/api/users/:id` | Eliminar usuario |

#### Fichas

| Método | Ruta | Descripción |
| --- | --- | --- |
| `GET` | `/api/fichas` | Obtener fichas |
| `POST` | `/api/fichas` | Crear ficha |

#### Exámenes

| Método | Ruta | Descripción |
| --- | --- | --- |
| `GET` | `/api/examenes` | Obtener exámenes |
| `POST` | `/api/examenes` | Crear examen |

## Ejemplo de login

```bash
curl -X POST http://localhost:3001/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@salud.cl","password":"admin123"}'
```

## Estructura del proyecto

```text
.
├── public/                 # Archivos estáticos
├── src/
│   ├── config/             # Configuración de PostgreSQL
│   ├── controllers/        # Lógica del negocio
│   ├── data/               # SQL y colección Postman
│   ├── middlewares/        # Validación de token y body
│   ├── models/             # Modelos Sequelize
│   ├── routes/             # Rutas de la API y vistas
│   ├── utils/              # Utilidades auxiliares
│   └── views/              # Plantillas Handlebars
├── .env                    # Variables de entorno
├── log.txt                 # Registro de operaciones
├── package.json            # Dependencias y scripts
├── server.js               # Punto de entrada
└── README.md               # Documentación del proyecto
```

## Notas importantes

- El proyecto ya incluye validación de token por JWT en rutas sensibles.
- Si la base de datos fue creada sin la columna `password`, el sistema la crea automáticamente al iniciar para evitar errores.
- La aplicación está preparada para funcionar con una base de datos PostgreSQL local y con un arranque limpio del proyecto.

## Autoría

- Aracelly Núñez
- nunezaracelly@gmail.com
- Proyecto de gestión clínica / módulo de desarrollo backend