const { ErrorHandler } = require('../../models/error');
const isJson = function( req, res, next){
    //console.log("enter isJson")
    var contype = req.headers['content-type'];
    if (!contype || contype.indexOf('application/json') !== 0)
        return res.status(406).json(new ErrorHandler(406, 'CLIENT_ERROR', 'Only json request'));
    
    next();
}

module.exports = { isJson }