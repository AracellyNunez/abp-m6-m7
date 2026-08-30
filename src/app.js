import express from "express";
import { create } from "express-handlebars";

import * as path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

import userRoutes from "./routes/users.routes.js";
import viewsRoutes from "./routes/views.routes.js";

// Importa tu conexión a la base de datos de Sequelize
import sequelize from "./config/db.js";

const app = express();

//***** INICIO CONFIGURACIÓN HANDLEBARS *****

const hbs = create({
	partialsDir: [
		path.join(__dirname, "views/partials/"),
	],
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views"));

//***** FIN CONFIGURACIÓN HANDLEBARS *****

//MIDDLEWARES GLOBALES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

//RUTAS DE LAS VISTAS (FRONTEND)
app.use("/", viewsRoutes);
//USO DE RUTAS DE API
app.use("/api/users", userRoutes);

// Función para probar la conexión y sincronizar la base de datos antes de exportar o arrancar
const startDB = async () => {
	try {
		await sequelize.authenticate();
		console.log('Conexión a la base de datos establecida con éxito.');

		// Esto creará o actualizará las tablas en PostgreSQL según tus modelos
		await sequelize.sync({ alter: true });
		console.log('Tablas sincronizadas correctamente.');
	} catch (error) {
		console.error('Error al conectar con la base de datos:', error);
	}
};

startDB();

export default app;