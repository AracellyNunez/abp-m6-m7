import fs from 'fs';
import path from 'path';

export const writeLog = (action, details) => {
    const timestamp = new Date().toLocaleString(); // Fecha y hora 
    const logMessage = `[${timestamp}] - ACCIÓN: ${action} | DETALLE: ${details}\n`;

    const logPath = path.join(process.cwd(), 'log.txt');

    fs.appendFile(logPath, logMessage, (err) => {
        if (err) {
            console.error("Error al escribir en el archivo log.txt:", err);
        }
    });
};