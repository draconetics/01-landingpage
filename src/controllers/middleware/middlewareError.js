const middlewareErrorDevelopment = function (err, req, res, next) {

    res.status(err.status || 500); 
    logger.log('Middleware Error - Info ', err.message + " expected URL was " + req.url);
    res.status(err.status).send(err.status, {
        message: err.message,
        error  : err
    });
        
}
    
const middlewareErrorProduction = function (err, req, res, next) {
    
    res.status(err.status || 500);
    logger.log('Middleware Error - Info ', err.message + " expected URL was " + req.url);
    res.status(err.status).send(err.status, {
        message: err.message,
        error  : {}
    });
}

module.exports = { middlewareErrorDevelopment, middlewareErrorProduction };