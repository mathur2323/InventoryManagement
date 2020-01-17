const jwt = require('jsonwebtoken');
const jwtSecretKey = require('./../config/keys').jwtSecreyKey;

function auth(req, res, next) {
    const token = req.header('x-auth-token');

    if (!token)
        res.status(401).json({ msg: 'Unauthorized Access' })

    try {
        const decoded = jwt.verify(token, jwtSecretKey);

        req.user = decoded;
        next();
    } catch (e) {
        res.status(400).json({ msg: 'Token is invalid' })
    }
}

module.exports = auth;