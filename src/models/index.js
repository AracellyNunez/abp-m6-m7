import User from "./User.model.js";
import Ficha from "./ficha.model.js";

// Relación 1:N -> Un usuario tiene muchas fichas
User.hasMany(Ficha, { foreignKey: "userId", onDelete: "CASCADE" });
Ficha.belongsTo(User, { foreignKey: "userId" });

export { User, Ficha };