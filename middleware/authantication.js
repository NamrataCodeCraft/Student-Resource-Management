const jwt = require('jsonwebtoken');
const httpResponse = require('../utils/httpResponse');

const authantication = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return httpResponse(res, 401, 'Unauthorized');
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        return httpResponse(res, 401, 'Unauthorized');
    }
}

module.exports = authantication;    