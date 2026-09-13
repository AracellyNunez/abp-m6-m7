import { User, Examen } from "../models/index.js";
import path from "path";

export const getExamenes = async (req, res) => {
    try {
        const examenes = await Examen.findAll({
            include: [{
                model: User,
                attributes: ["id", "firstname", "lastname", "rut", "email"]
            }]
        });
        res.json({ examenes });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al obtener los exámenes." });
    }
};

export const createExamen = async (req, res) => {
    try {

       const { nombreExamen, codigoExamen, observaciones, userId } = req.body;

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "El paciente no existe." });
        }

        let nombreArchivo = null;

        if (req.files && req.files.archivo) {
            const archivoSubido = req.files.archivo;
            nombreArchivo = `${Date.now()}-${archivoSubido.name}`;
            const uploadPath = path.resolve(`public/uploads/${nombreArchivo}`);
            await archivoSubido.mv(uploadPath);
        }

        // 1. Creamos el examen (sin userId directo, ya que usa tabla intermedia N:M)
        const nuevoExamen = await Examen.create({
            nombreExamen,
            codigoExamen,
            observaciones,
            archivo: nombreArchivo
        });

        // 2. Asociamos el examen al usuario usando la relación N:M de Sequelize
        await user.addExamen(nuevoExamen);

        res.status(201).json({
            message: "Examen creado exitosamente con su archivo",
            examen: nuevoExamen
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al registrar el examen." });
    }
};