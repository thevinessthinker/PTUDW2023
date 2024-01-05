module.exports = (err, req, res, next) => {
    console.log('\n[ERROR LOGS]');
    console.error(err.stack);
    console.log('\n');
    next(err);
};
