const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const AppError = require('../../utils/appError');
const env = require('../../config/environment');

module.exports = (err, req, res, next) => {
    console.log('GO TO CatchAllErrorHandler');
    const genericError = {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        reasonPhrase: ReasonPhrases.INTERNAL_SERVER_ERROR,
        message: 'Xin lỗi, có gì đó sai sai',
    };

    const statusCode = err.statusCode || genericError.statusCode;
    const reasonPhrase = err.reasonPhrase || genericError.reasonPhrase;
    const message = err.message || genericError.message;
    const error = new AppError(statusCode, reasonPhrase, message);

    if (env.BUILD_MODE !== 'dev') delete error.stack;

    res.render('error', {
        title: `${message} | ${statusCode} ${reasonPhrase}`,
        error: error,
    });
};
