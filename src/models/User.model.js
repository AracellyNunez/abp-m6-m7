import { readDataJson, writeDataJson } from "../utils/utils.js";
import { writeLog } from "../utils/log.js";

const filename = "users.json";

class User {
    constructor(firstname, lastname, email, rut, id = null, createdAt = null) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.rut = rut;

        this.createdAt = createdAt || new Date().toLocaleString();

        if (!id) {
            const data = readDataJson(filename);
            if (data.users.length > 0) {
                const maxId = Math.max(...data.users.map(u => Number(u.id) || 0));
                this.id = maxId >= 22001 ? maxId + 1 : 22001;
            } else {
                this.id = 22001;
            }
        } else {
            this.id = id;
        }
    }

    save() {
        const data = readDataJson(filename);

        // Validación formato de RUT
        const rutRegex = /^\d{1,2}\.\d{3}\.\d{3}-[\dkK]$|^\d{7,8}-[\dkK]$/;
        if (!rutRegex.test(this.rut.trim())) {
            const error = new Error("El formato del RUT es incorrecto. Use el formato: 12.345.678-9");
            error.code = 400;
            throw error;
        }

        // Ver si ya existe el email O el RUT
        const existEmail = data.users.some(u => u.email.toLowerCase() === this.email.toLowerCase());
        const existRut = data.users.some(u => u.rut.trim() === this.rut.trim());

        if (existEmail) {
            const error = new Error("Ya existe un usuario registrado con el email: " + this.email);
            error.code = 400;
            throw error;
        }

        if (existRut) {
            const error = new Error("Ya existe un paciente registrado con el RUT: " + this.rut);
            error.code = 400;
            throw error;
        }

        data.users.push(this);
        writeDataJson(filename, data);

        // fs.appendFile
        writeLog("CREAR_PACIENTE", `Se registró exitosamente el paciente ${this.firstname} ${this.lastname} con RUT ${this.rut}`);

        return this;
    }

    update() {
        const data = readDataJson(filename);
        let indexUser = data.users.findIndex(u => u.id == this.id);

        if (indexUser == -1) {
            const error = new Error("No puede actualizar un usuario que no existe en la base de datos, primero debe crearlo.");
            error.code = 400;
            throw error;
        }

        const userCompare = data.users.find(u => u.email == this.email);

        if (userCompare && userCompare.id != this.id) {
            const error = new Error("El correo que intenta actualizar, pertenece a otro usuario, pruebe con otro correo.");
            error.code = 400;
            throw error;
        }

        this.createdAt = data.users[indexUser].createdAt || this.createdAt;

        data.users[indexUser] = this;
        writeDataJson(filename, data);

        //Log  
        writeLog("ACTUALIZAR_PACIENTE", `Se actualizó el paciente con ID ${this.id} (${this.firstname} ${this.lastname})`);

        return this;
    }

    delete() {
        const data = readDataJson(filename);
        let indexUser = data.users.findIndex(u => u.id == this.id);

        if (indexUser == -1) {
            const error = new Error("No puede eliminar un usuario que no existe en la base de datos, primero debe crearlo.");
            error.code = 400;
            throw error;
        }

        data.users.splice(indexUser, 1);
        writeDataJson(filename, data);

        writeLog("ELIMINAR_PACIENTE", `Se eliminó el paciente con ID N°: ${this.id}`);

        return true;
    }

    // Static methods
    static findAll() {
        const { users } = readDataJson(filename);

        return users.map(user => {
            let { firstname, lastname, email, rut, id, createdAt } = user;
            return new User(firstname, lastname, email, rut, id, createdAt);
        });
    }

    static findById(idUser) {
        const { users } = readDataJson(filename);
        const user = users.find(u => u.id == idUser);

        if (!user) return false;

        let { firstname, lastname, email, rut, id, createdAt } = user;
        return new User(firstname, lastname, email, rut, id, createdAt);
    }

    static findByEmail(emailUser) {
        const { users } = readDataJson(filename);
        emailUser = emailUser.toLowerCase().trim();
        const user = users.find(u => u.email.toLowerCase() == emailUser);

        if (!user) return false;

        let { firstname, lastname, email, rut, id, createdAt } = user;
        return new User(firstname, lastname, email, rut, id, createdAt);
    }
}

export default User;