// payload will contain message and data
const sendResponse = (req,res,payload) => {
    const {statusCode, message, data} = payload;
    res.status(statusCode).json({
        message:message,
        data:data
    });
}

module.exports = sendResponse;