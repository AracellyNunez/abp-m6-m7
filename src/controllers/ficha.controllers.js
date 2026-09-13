import { User, Ficha } from "../models/index.js";
import path from "path";
import fs from "fs";

export const createFicha = async (req, res) => {
    try {
        const { diagnostico, observaciones, fechaAtencion, userId } = req.body;

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "El paciente al que intenta asociar la ficha no existe." });
        }

        let nombreArchivo = null;

        // Verificamos si se adjuntó un archivo
        if (req.files && req.files.archivo) {
            const archivoSubido = req.files.archivo;

            // Creamos un nombre único para evitar que se sobrescriban archivos con el mismo nombre
            nombreArchivo = `${Date.now()}-${archivoSubido.name}`;
            const uploadPath = path.resolve(`public/uploads/${nombreArchivo}`);

            // Movemos el archivo físicamente a la carpeta
            await archivoSubido.mv(uploadPath);
        }

        const nuevaFicha = await Ficha.create({
            diagnostico,
            observaciones,
            fechaAtencion,
            archivo: nombreArchivo, // Guardamos el nombre del archivo en la base de datos
            userId
        });

        res.status(201).json({
            message: "Ficha creada exitosamente con su archivo",
            ficha: nuevaFicha
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al registrar la ficha médica." });
    }
};

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