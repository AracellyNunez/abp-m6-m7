import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Examen = sequelize.define("Examen", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombreExamen: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    codigoExamen: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    observaciones: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    archivo: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: "Examenes",
    timestamps: true
});

export default Examen;