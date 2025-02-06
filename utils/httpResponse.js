const httpResponse = (res, statusCode, msg, data = []) => {
    const response = {
        statusCode,
        msg,
        result: data
    }
    res.status(statusCode).json(response);
}

module.exports = httpResponse;