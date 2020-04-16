const router = require('express-promise-router')();
const { ErrorHandler } = require('../models/error');


//The 404 Route (ALWAYS Keep this as the last route)
router.get('*', function(req, res){
    const errorHandler = new ErrorHandler(404, 'CLIENT_ERROR', 'Page not found');
    res.status(404).send(errorHandler);
  });


module.exports = router;