const paginatedResults =  function(model){
    return async (req, res, next) => {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 5
    
        const startIndex = (page - 1) * limit
        const endIndex = page * limit
    
        const results = {};
        let errorHandler = {};
    
        
        const totalDocuments = await model
                                      .countDocuments()
                                      .exec()
                                      .catch(e=>
                                        res.status(500).json(new ErrorHandler( 500, 'SERVER_ERROR', e))
                                      );
                                
        if (endIndex < totalDocuments) {
          results.next = {
            page: page + 1,
            limit: limit
          }
        }
        
        if (startIndex > 0) {
          results.previous = {
            page: page - 1,
            limit: limit
          }
        }
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
