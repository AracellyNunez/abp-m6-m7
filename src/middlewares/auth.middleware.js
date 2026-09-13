import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    let token = null;

    // 1. Busca en el header Authorization tradicional
    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
    }

    // 2. Si no está, busca si viajó en el body o query (por si acaso)
    if (!token && req.body && req.body.token) {
        token = req.body.token;
    }

    if (!token) {
        return res.status(403).json({ message: 'No se proporcionó un token de autenticación' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido o expirado' });
    }
};

export default verifyToken;