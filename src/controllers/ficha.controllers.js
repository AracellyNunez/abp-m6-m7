import { User, Ficha } from "../models/index.js";

export const createFicha = async (req, res) => {
    try {
        const { diagnostico, observaciones, fechaAtencion, userId } = req.body;

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "El paciente al que intenta asociar la ficha no existe." });
        }

        const nuevaFicha = await Ficha.create({
            diagnostico,
            observaciones,
            fechaAtencion,
            userId
        });

        res.status(201).json({
            message: "Ficha creada exitosamente",
            ficha: nuevaFicha
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al registrar la ficha médica." });
    }
};

// Obtener todas las fichas incluyendo los datos del paciente 
export const getFichas = async (req, res) => {
    try {
        const fichas = await Ficha.findAll({
            include: [{
                model: User,
                attributes: ["id", "firstname", "lastname", "rut", "email"]
            }]
        });

        res.json({ fichas });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al obtener las fichas." });
    }
};