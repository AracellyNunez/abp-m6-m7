import { Examen } from "../models/index.js";

export const getExamenes = async (req, res) => {
    try {
        const examenes = await Examen.findAll();
        res.json({ examenes });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al obtener los exámenes." });
    }
};

export const createExamen = async (req, res) => {
    try {
        const { nombreExamen, codigoExamen, costo } = req.body;

        const nuevoExamen = await Examen.create({
            nombreExamen,
            codigoExamen,
            costo
        });

        res.status(201).json({
            message: "Examen creado exitosamente",
            examen: nuevoExamen
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al registrar el examen." });
    }
};