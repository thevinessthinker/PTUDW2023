const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const AppError = require('../../utils/appError');
const env = require('../../config/environment');

module.exports = (req, res, next) => {
    const error = new AppError(
        StatusCodes.NOT_FOUND,
        ReasonPhrases.NOT_FOUND,
        'Xin lỗi, trang bạn đang tìm kiếm không tồn tại',
    );

    if (env.BUILD_MODE !== 'dev') delete error.stack;

    res.status(StatusCodes.NOT_FOUND).render('error.hbs', {
        title: `Không tìm thấy trang được yêu cầu | ${StatusCodes.NOT_FOUND} ${ReasonPhrases.NOT_FOUND}`,
        error: error,
    });
};
