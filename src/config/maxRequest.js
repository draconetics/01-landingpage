const { ErrorHandler } = require('../models/error')

const maxRequest = {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: new ErrorHandler(429, 'SERVER_ERROR', ['Too many requests, please try again later.', 'Try again after 15 minutes.']),
    headers: false
}

module.exports = { maxRequest };