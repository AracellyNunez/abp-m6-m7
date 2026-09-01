import User from "../models/User.model.js";

// VISTA HOME
export const homeView = (req, res) => {
    try {
        res.render("home");
    } catch (error) {
        res.status(500).send("Error en cargar vista...");
    }
};

export const usersView = async (req, res) => {
    try {
        
        const usersData = await User.findAll({
            attributes: { exclude: ["password"] },
            raw: true 
        });

        res.render("listUsers", {
            users: usersData
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error en cargar vista...");
    }
};

export const usersAddView = (req, res) => {
    try {
        res.render("addUsers");
    } catch (error) {
        res.status(500).send("Error en cargar vista...");
    }
};

export const usersUpdateView = async (req, res) => {
    try {
        let { id } = req.params;
        const user = await User.findByPk(id, {
            attributes: { exclude: ["password"] },
            raw: true
        });

        if (!user) {
            return res.status(404).send("Usuario no encontrado para actualizar.");
        }

        res.render("updateUser", {
            user,
            id
        });

    } catch (error) {
        console.log(error);
        res.status(500).send("Error en cargar vista...");
    }
};

export const userProfileView = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id, {
            attributes: { exclude: ["password"] },
            raw: true
        });

        if (!user) {
            return res.status(404).send("Paciente no encontrado en el sistema.");
        }

        res.render("profile", {
            user
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al cargar la ficha clínica del paciente...");
    }
};