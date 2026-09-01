-- 1. Tabla de Usuarios (Pacientes)
CREATE TABLE "Users" (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    rut VARCHAR(12) UNIQUE NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabla de Fichas (Relación 1:N)
CREATE TABLE "Fichas" (
    id SERIAL PRIMARY KEY,
    diagnostico VARCHAR(255) NOT NULL,
    observaciones TEXT,
    "fechaAtencion" DATE DEFAULT CURRENT_DATE,
    "userId" INT NOT NULL,
    CONSTRAINT fk_fichas_usuario
        FOREIGN KEY ("userId")
        REFERENCES "Users"(id)
        ON DELETE CASCADE,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
-- 3. Tabla de Exámenes (Catálogo)
CREATE TABLE "Examenes" (
    id SERIAL PRIMARY KEY,
    "nombreExamen" VARCHAR(100) NOT NULL,
    "codigoExamen" VARCHAR(50) UNIQUE NOT NULL,
    costo FLOAT NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Tabla Intermedia para la relación N:M (PacienteExamen)
CREATE TABLE "PacienteExamen" (
    id SERIAL PRIMARY KEY,
    "userId" INT NOT NULL,
    "examenId" INT NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY ("userId") REFERENCES "Users"(id) ON DELETE CASCADE,
    CONSTRAINT fk_examen FOREIGN KEY ("examenId") REFERENCES "Examenes"(id) ON DELETE CASCADE,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);