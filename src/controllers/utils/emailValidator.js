const { MAX_LENGHT_EMAIL, MIN_LENGHT_EMAIL, 
        MAX_LENGHT_NAME, MIN_LENGHT_NAME} = require('./constants');
const { ErrorHandler } = require('../../models/error');

const validationResult = function (data) {

    const errorProperties = existAllProperties(data);
    if(!isEmpty(errorProperties))
        return errorProperties;

    const errorEmail = validateEmail(data.email);
    if(!isEmpty(errorEmail))
        return errorEmail;
    
    const errorName = validateName(data.name);
    if(!isEmpty(errorName))
        return errorName;

    return {};    
}

const existAllProperties = function(obj) {
    let errorProperty = {}
    if (!obj.hasOwnProperty('name')) 
    {
        errorProperty = new ErrorHandler(422,"CLIENT_ERROR", "Name field is required");
    }

    if (!obj.hasOwnProperty('email')) 
    {
        errorProperty = new ErrorHandler(422,"CLIENT_ERROR", "Email field is required");
    }

    return errorProperty;
}

const isEmpty = function(obj) {
    return Object.keys(obj).length == 0;
}

const validateEmail = function (email) {
    const isEmptyField = email.length == 0;
    const isCorrectEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    const isWrongLength = email.length < MIN_LENGHT_EMAIL || email.length > MAX_LENGHT_EMAIL
    let errorMessage = {};
    
    if(isEmptyField)
    {
        errorMessage = new ErrorHandler(422,"CLIENT_ERROR", "Email is empty field");   
    }

    if(isWrongLength || !isCorrectEmail)
    {
        errorMessage = new ErrorHandler(422,"CLIENT_ERROR", "Email is not recognized.");   
    }

    return errorMessage;
}

const validateName = function (name) {
    let errorMessage = {};
    let isEmptyField = name.length == 0;
    let isAlphabetic = /^[a-zA-Z\s]*$/.test(name);
    const isWrongLength = name.length < MIN_LENGHT_NAME || name.length > MAX_LENGHT_NAME

    if(isEmptyField)
    {
        errorMessage = new ErrorHandler(422,"CLIENT_ERROR", "Name is empty field");   
    }

    if(isWrongLength || !isAlphabetic)
    {
        errorMessage = new ErrorHandler(422,"CLIENT_ERROR", "Name is not recognized.");   
    }
    
    return errorMessage;
}

module.exports = { validationResult, isEmpty, validateName, validateEmail };