import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Examen = sequelize.define("Examen", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombreExamen: { // Ej: Hemograma, Colesterol Total, PCR
        type: DataTypes.STRING,
        allowNull: false,
    },
    codigoExamen: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    costo: {
        type: DataTypes.FLOAT,
        allowNull: false,
    }
}, {
    tableName: "Examenes",
    timestamps: true
});

export default Examen;