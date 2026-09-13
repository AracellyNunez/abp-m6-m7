import User from "../models/User.model.js";
import { Examen } from "../models/index.js";
import { Ficha } from "../models/index.js";
import { Op } from "sequelize";

// Vista de Inicio / Home
export const homeView = (req, res) => {
    res.render("home", { title: "Inicio" });
};

// Vista de Login
export const loginView = (req, res) => {
    res.render("login", { title: "Iniciar Sesión" });
};

// Vista para listar usuarios/pacientes
export const usersView = async (req, res) => {
    try {
        const users = await User.findAll({
            where: {
                role: {
                    [Op.ne]: 'admin'
                }
            },
            attributes: { exclude: ["password"] },
            raw: true
        });

        res.render("listUsers", {
            title: "Lista de Pacientes",
            users
        });
    } catch (error) {
        console.error("Error al cargar la vista de usuarios:", error);
        res.status(500).send("Error al cargar la vista de usuarios");
    }
};

export const usersAddView = (req, res) => {
    res.render("addUsers", { title: "Registrar Usuario" });
};

// Vista del perfil del usuario corregida para asegurar que pasen bien las fichas y exámenes
export const userProfileView = async (req, res) => {
    try {
        const { id } = req.params;

        // Buscamos al usuario sin raw: true para aprovechar los métodos de Sequelize
        const user = await User.findByPk(id, {
            attributes: { exclude: ["password"] }
        });

        if (!user) {
            return res.status(404).send("Usuario no encontrado");
        }

        // Buscamos sus fichas y exámenes por separado de forma segura
        const fichas = await Ficha.findAll({ where: { userId: id } }).catch(() => []);
        const examenes = await Examen.findAll({ where: { userId: id } }).catch(() => []);

        // Estructuramos el objeto plano para Handlebars
        const userData = {
            ...user.toJSON(),
            fichas: fichas.map(f => f.toJSON()),
            examenes: examenes.map(e => e.toJSON())
        };

        res.render("profile", { title: "Perfil de Usuario", user: userData });
    } catch (error) {
        console.error("Error al cargar el perfil:", error);
        res.status(500).send("Error al cargar el perfil");
    }
};

export const usersUpdateView = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id, {
            attributes: { exclude: ["password"] },
            raw: true
        });

        if (!user) {
            return res.status(404).send("Usuario no encontrado");
        }

        res.render("updateUser", { title: "Actualizar Usuario", user });
    } catch (error) {
        console.error("Error al cargar la vista de actualización:", error);
        res.status(500).send("Error al cargar la vista de actualización");
    }
};

export const examenesView = async (req, res) => {
    try {
        const examenes = await Examen.findAll({ raw: true });
        res.render("examene", { title: "Lista de Exámenes", examenes });
    } catch (error) {
        console.error("Error al cargar exámenes:", error);
        res.status(500).send("Error al cargar la vista de exámenes");
    }
};

export const fichasView = async (req, res) => {
    try {
        const fichas = await Ficha.findAll({
            include: [{
                model: User,
                attributes: ["id", "firstname", "lastname", "rut", "email"]
            }],
            raw: true,
            nest: true
        });

        res.render("fichas", { title: "Fichas Médicas", fichas });
    } catch (error) {
        console.error("Error al cargar fichas:", error);
        res.status(500).send("Error al cargar la vista de fichas");
    }
};

export const fichaAddView = (req, res) => {
    const { id } = req.params;
    res.render("addFicha", { title: "Subir Ficha Clínica", userId: id });
};

export const examenAddView = (req, res) => {
    const { id } = req.params;
    res.render("addExamen", { title: "Subir Examen Médico", userId: id });
};