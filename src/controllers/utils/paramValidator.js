const { DEFAULT_PAGE_NUMBER, 
        DEFAULT_LIMIT, 
        MAX_LIMIT,
        MIN_LIMIT } = require('./constants')

const validatePage = function (req, totalDocuments, limit) {
    let pageNumber = parseInt(req.query.page) || DEFAULT_PAGE_NUMBER
    //console.log("pageNumber" + pageNumber)
    //verificar si es negativo
    if( pageNumber < 1 )
    {
        return DEFAULT_PAGE_NUMBER
    }

    let MAX_PAGE_NUMBER = DEFAULT_PAGE_NUMBER
    if( totalDocuments >= limit )
    {
        MAX_PAGE_NUMBER = totalDocuments / limit
        if( totalDocuments % limit > 0)
            MAX_PAGE_NUMBER = MAX_PAGE_NUMBER + 1;
    }

    //console.log("max_page_number" + MAX_PAGE_NUMBER)

    if( MAX_PAGE_NUMBER < 1 )
    {
        //console.log("menor a max_page_number" + DEFAULT_PAGE_NUMBER)
        return DEFAULT_PAGE_NUMBER
    }
    
    if( pageNumber > MAX_PAGE_NUMBER )
    {
        return MAX_PAGE_NUMBER
    }
    
    return pageNumber
}

const validateLimit = function (req) {
    let limit = parseInt(req.query.limit) || DEFAULT_LIMIT
    
    //verify if it is negative
    if(limit < MIN_LIMIT)
    {
        return MIN_LIMIT;
    }

    //verify if it is more than max limit
    if (limit > MAX_LIMIT)
    {
        return MAX_LIMIT
    }

    return limit
}

// page = ( (totalDocuments/limit) >= page ) ? page : 1;
// limit = (totalDocuments <= limit)  ? limit : 5

module.exports = { validatePage, validateLimit }