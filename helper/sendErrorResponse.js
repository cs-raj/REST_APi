const AppError = require('../helper/AppError');
const sendErrorResponse = (error, req, res) => {
    res.status(error.statusCode).json({
        message:error.message,
        data:[error.data]
    });
}
module.exports = sendErrorResponse;