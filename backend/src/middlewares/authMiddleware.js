const jwt = require('jsonwebtoken');
const SECRET_KEY = 'tu_clave_secreta'; // Mismo que antes

const verificarToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ error: 'Token no proporcionado' });
    }

    try {
        const tokenReal = token.split(' ')[1];  // Bearer <token>
        const verificado = jwt.verify(tokenReal, SECRET_KEY);
        req.usuario = verificado;  // Ahora en req.usuario tenés los datos
        next();
    } catch (err) {
        res.status(401).json({ error: 'Token inválido' });
    }
};

module.exports = verificarToken;
