import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            msg: "Ya existe un usuario registrado con este email."
        },
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true
    },
    rut: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            msg: "Ya existe un paciente registrado con este RUT."
        }
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: true
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'patient',
        allowNull: false
    }
}, {
    tableName: "Users",
    timestamps: true
});

export default User;