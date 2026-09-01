import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Ficha = sequelize.define("Ficha", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    diagnostico: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    observaciones: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    fechaAtencion: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: "Fichas",
    timestamps: true
});

export default Ficha;