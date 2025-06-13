const errorHandler = (err, req, res, next) => {
    res.status(500);
    console.log(err.message);
    
    res.json({
        error: err.message
    });
};

module.exports = errorHandler;