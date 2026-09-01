import User from "./User.model.js";
import Ficha from "./fichas.model.js";
import Examen from "./examen.model.js";

// Relación 1:N -> Un usuario tiene muchas fichas
User.hasMany(Ficha, { foreignKey: "userId", onDelete: "CASCADE" });
Ficha.belongsTo(User, { foreignKey: "userId" });

// Relación N:M -> Un usuario puede tener muchos exámenes y un examen pertenece a muchos usuarios
User.belongsToMany(Examen, {
    through: "PacienteExamen",
    foreignKey: "userId",
    otherKey: "examenId"
});

Examen.belongsToMany(User, {
    through: "PacienteExamen",
    foreignKey: "examenId",
    otherKey: "userId"
});

export { User, Ficha, Examen };