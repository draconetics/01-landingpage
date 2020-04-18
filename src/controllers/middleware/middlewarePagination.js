const { ErrorHandler } = require('../../models/error');
const { validatePage, validateLimit } = require('../utils/paramValidator')

const paginatedResults =  function(model){
    return async (req, res, next) => {
        const totalDocuments = await model
            .countDocuments()
            .exec()
            .catch(e=>
              res.status(500).json(new ErrorHandler( 500, 'SERVER_ERROR', e))
            );

        const limit = validateLimit(req)
        const page = validatePage(req, totalDocuments, limit)  

        console.log("========");
        console.log("limit : " + limit);
        console.log("page: " + page);

        const startIndex = (page - 1) * limit
        const endIndex = page * limit
    
        const results = {};
        let errorHandler = {};
    
        
        

        //default next page when database is empty
        results.next = {
          page: -1,//page no exist
          limit: limit
        }
        if (endIndex < totalDocuments){
          results.next.page = page + 1
        }
        
        //default previous page when database is empty
        results.previous = {
          page: -1,//page no exist
          limit: limit
        }
        if (startIndex > 0) {
          results.previous.page = page - 1
        }
        //actual page
        results.actual = { page: page }

        try {
          results.results = await model
                                  .find()
                                  .limit(limit)
                                  .skip(startIndex)
                                  .exec()

          res.paginatedResults = results
          next()
        } catch (e) {
          errorHandler = new ErrorHandler(500, 'SERVER_ERROR', e);
          res.status(500).json(errorHandler);
        }
    }
}

module.exports = { paginatedResults };
