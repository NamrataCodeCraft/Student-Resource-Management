const httpResponse = require('../utils/httpResponse');

const adminAccess = (req, res, next) => {
    try {
        if (req.user.role !== 'admin') {
            return httpResponse(res, 403, 'Access Denied');
        }
        next();
    } catch (error) {
        console.log(error);
        return httpResponse(res, 403, 'Access Denied');
    }
}

module.exports = adminAccess;    