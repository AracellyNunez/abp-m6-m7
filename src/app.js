import express from "express";
import { create } from "express-handlebars";
import fileUpload from "express-fileupload";
import bcrypt from "bcryptjs";

import * as path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

import userRoutes from "./routes/users.routes.js";
import viewsRoutes from "./routes/views.routes.js";
import fichasRoutes from "./routes/fichas.routes.js";
import examenRoutes from "./routes/examen.routes.js";
import authRoutes from "./routes/auth.routes.js";

import sequelize from "./config/db.js";
import "./models/index.js";
import User from "./models/User.model.js";

const app = express();

// CONFIGURACIÓN HANDLEBARS 
const hbs = create({
    partialsDir: [
        path.join(__dirname, "views/partials/"),
    ],
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views"));

// MIDDLEWARES GLOBALES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// middleware de express-fileupload 
app.use(fileUpload({
    createParentPath: true 
}));

app.use(express.static('public'));

// RUTAS DE LAS VISTAS (FRONTEND)
app.use("/", viewsRoutes);

// USO DE RUTAS DE API
app.use("/api/users", userRoutes);
app.use("/api/fichas", fichasRoutes);
app.use("/api/examenes", examenRoutes);
app.use("/api", authRoutes);

// FUNCIÓN PARA CREAR O ACTUALIZAR ADMINISTRADOR POR DEFECTO
const crearAdminPorDefecto = async () => {
    try {
        const adminExistente = await User.findOne({ where: { email: 'admin@salud.cl' } });
        const passwordHash = await bcrypt.hash('admin123', 10);

        if (!adminExistente) {
            await User.create({
                firstname: 'Administrador',
                lastname: 'Clínico',
                rut: '11111111-9',
                email: 'admin@salud.cl',
                password: passwordHash,
                role: 'admin'
            });

            console.log('Usuario administrador creado por defecto: admin@salud.cl / admin123');
        } else {
            await adminExistente.update({
                role: 'admin',
                password: adminExistente.password || passwordHash
            });
        }
    } catch (error) {
        console.error('Error al crear o actualizar el usuario administrador por defecto:', error);
    }
};

const ensurePasswordColumn = async () => {
    try {
        const [rows] = await sequelize.query(`
            SELECT column_name
            FROM information_schema.columns
            WHERE table_name = 'Users' AND column_name = 'password'
        `);

        if (!rows.length) {
            await sequelize.query('ALTER TABLE "Users" ADD COLUMN IF NOT EXISTS password VARCHAR(255);');
            console.log('Columna password agregada al modelo Users.');
        }
    } catch (error) {
        console.error('No se pudo verificar la columna password:', error);
    }
};

const startDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida con éxito.');

        await ensurePasswordColumn();
        await sequelize.sync({ alter: true });
        console.log('Tablas sincronizadas correctamente.');

        await crearAdminPorDefecto();
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
    }
};

startDB();

export default app;