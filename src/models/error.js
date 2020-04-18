class ErrorHandler extends Error {
    constructor(statusCode, status, message) {
      super();
      //MAX 8 STATUS CODES
      this.statusCode = statusCode || 500;
      //SERVER_ERROR or CLIENT_ERROR 
      this.status = status || 'Generic Error';
      //ARRAY OF DETAILS
      this.message = message || 'Generic Error - Internal Server Error';
    }
  }


  module.exports = { ErrorHandler }