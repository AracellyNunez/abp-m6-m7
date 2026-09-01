import User from "../models/User.model.js";
import chalk from "chalk";

const log = {
    error: (msg) => console.log(chalk.red(msg))
};

export const findAll = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ["password"] }
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
        const usuario = await User.findByPk(id, {
            attributes: { exclude: ["password"] }
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

export const findByEmail = async (req, res) => {
    try {
        let { email } = req.params;
        const usuario = await User.findOne({
            where: { email },
            attributes: { exclude: ["password"] }
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
        let { firstName, lastname, firstname, email, rut, password } = req.body;

        const fName = firstName || firstname;
        const lName = lastname || req.body.lastName;

        if (!fName || !lName || !email || !rut) {
            return res.status(400).json({
                message: "No se proporcionan todos los campos requeridos.",
            });
        }

        const newUser = await User.create({
            firstname: fName,
            lastname: lName,
            email,
            rut,
            password: password || "TempPassword123" // Contraseña por defecto 
        });

        // Ocultar password en la respuesta
        const userResponse = newUser.toJSON();
        delete userResponse.password;

        res.status(201).json({ message: "Usuario creado con éxito", user: userResponse });
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
        let { firstName, lastname, firstname, email, rut } = req.body;

        const fName = firstName || firstname;
        const lName = lastname || req.body.lastName;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }

        await user.update({
            ...(fName && { firstName: fName }),
            ...(lName && { lastName: lName }),
            ...(email && { email }),
            ...(rut && { rut })
        });

        const userResponse = user.toJSON();
        delete userResponse.password;

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