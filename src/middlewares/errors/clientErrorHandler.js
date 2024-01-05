module.exports = (err, req, res, next) => {
    if (req.xhr) {
        console.log('GO TO ClientErrorHandler');
        res.status(err.statusCode).json({
            success: false,
            error: err.statusCode + ' ' + err.reasonPhrase,
            message: err.message,
        });
    } else {
        next(err);
    }
};
