import User from "../models/User.model.js";

// VISTA HOME
export const homeView = (req, res) => {
    try {
        res.render("home");
    } catch (error) {
        res.status(500).send("Error en cargar vista...");
    }
}

export const usersView = (req, res) => {
    try {

        const users = User.findAll();

        res.render("listUsers", {
            users
        });
    } catch (error) {
        res.status(500).send("Error en cargar vista...");
    }
}


export const usersAddView = (req, res) => {
    try {
        res.render("addUsers");

    } catch (error) {
        res.status(500).send("Error en cargar vista...");
    }
}

export const usersUpdateView = (req, res) => {
    try {
        let { id } = req.params;
        let user = User.findById(id);

        res.render("updateUser", {
            user,
            id
        });

    } catch (error) {
        res.status(500).send("Error en cargar vista...");
    }
}

export const userProfileView = (req, res) => {
    try {
        const { id } = req.params;
        const user = User.findById(id);

        if (!user) {
            return res.status(404).send("Paciente no encontrado en el sistema.");
        }

        res.render("profile", {
            user
        });
    } catch (error) {
        res.status(500).send("Error al cargar la ficha clínica del paciente...");
    }
}


