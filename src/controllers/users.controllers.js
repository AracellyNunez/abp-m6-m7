import User from "../models/User.model.js";
import Ficha from "../models/fichas.model.js";
import Examen from "../models/Examen.model.js";
import bcrypt from "bcryptjs";
import chalk from "chalk";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const log = {
    error: (msg) => console.log(chalk.red(msg))
};

export const renderProfile = async (req, res) => {
    try {
        let { id } = req.params;

        // 1. Buscamos al usuario incluyendo sus Fichas y sus Exámenes mediante las asociaciones de Sequelize
        const user = await User.findByPk(id, {
            include: [
                { model: Ficha },
                { model: Examen }
            ]
        });

        if (!user) {
            return res.status(404).send("Paciente no encontrado.");
        }

        // 2. Convertimos a JSON plano
        const userJSON = user.toJSON();

        // 3. Extraemos las fichas y los exámenes manejando las variantes de plurales que Sequelize suele generar
        const userData = {
            ...userJSON,
            fichas: userJSON.Fichas || [],
            examenes: userJSON.Examenes || userJSON.Examens || []
        };

        // Imprimimos en consola para verificar los datos exactos que recibe la vista
        console.log("DATOS DEL USUARIO EN PERFIL:", JSON.stringify(userData, null, 2));

        // Renderizamos la vista 'profile'
        res.render('profile', { user: userData });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al cargar el perfil del paciente.");
    }
};

export const findAll = async (req, res) => {
    try {
        const users = await User.findAll({
            where: { role: 'patient' }
        });

        res.json({ users });
    } catch (error) {
        log.error(error.message);
        res.status(500).json({
            message: "Error al intentar obtener los datos de los usuarios, intente más tarde...",
        });
    }
};

export const findById = async (req, res) => {
    try {
        let { id } = req.params;
        const usuario = await User.findByPk(id);

        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }

        res.json({ usuario });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al intentar obtener el usuario, intente más tarde.",
        });
    }
};

export const findByEmail = async (req, res) => {
    try {
        let { email } = req.params;
        const usuario = await User.findOne({
            where: { email }
        });

        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }

        res.json({ usuario });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al intentar obtener el usuario, intente más tarde.",
        });
    }
};

export const create = async (req, res) => {
    try {
        let { firstName, lastname, firstname, email, rut, telefono, password } = req.body;

        const fName = firstName || firstname;
        const lName = lastname || req.body.lastName;

        if (!fName || !lName || !email || !rut) {
            return res.status(400).json({
                message: "No se proporcionan todos los campos requeridos.",
            });
        }

        let savedFileName = null;
        if (req.files && req.files.file) {
            const file = req.files.file;
            savedFileName = `${Date.now()}-${file.name}`;
            const uploadPath = path.join(__dirname, '../uploads/', savedFileName);
            await file.mv(uploadPath);
        }

        const passwordHash = password ? await bcrypt.hash(password, 10) : null;

        const newUser = await User.create({
            firstname: fName,
            lastname: lName,
            email,
            password: passwordHash,
            rut,
            telefono: telefono || null,
            profileImage: savedFileName
        });

        const userResponse = newUser.toJSON();

        res.status(201).json({
            message: "Usuario creado con éxito",
            user: userResponse,
            file: savedFileName ? "Archivo subido correctamente" : "Sin archivo adjunto"
        });
    } catch (error) {
        console.log(error);
        if (error.name === "SequelizeUniqueConstraintError") {
            return res.status(400).json({ message: "El correo o RUT ya se encuentran registrados." });
        }
        res.status(500).json({ message: "Error al intentar guardar el usuario, intente más tarde." });
    }
};

export const update = async (req, res) => {
    try {
        let { id } = req.params;
        let { firstName, lastname, firstname, email, rut, telefono } = req.body;

        const fName = firstName || firstname;
        const lName = lastname || req.body.lastName;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }

        await user.update({
            ...(fName && { firstname: fName }),
            ...(lName && { lastname: lName }),
            ...(email && { email }),
            ...(rut && { rut }),
            ...(telefono !== undefined && { telefono })
        });

        const userResponse = user.toJSON();

        res.status(200).json({ message: "Usuario actualizado con éxito.", user: userResponse });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al intentar actualizar el usuario.",
        });
    }
};

export const deleteById = async (req, res) => {
    try {
        let { id } = req.params;
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }

        await user.destroy();

        res.json({ message: "Usuario eliminado con éxito" });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al intentar eliminar el usuario, intente más tarde.",
        });
    }
};