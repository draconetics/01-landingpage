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
        errorProperty.code = 422;
        errorProperty.status = "NAME_FIELD_REQUIRED";
        errorProperty.message = "Name field is required";
    }

    if (!obj.hasOwnProperty('email')) 
    {
        errorProperty.code = 422;
        errorProperty.status = "EMAIL_FIELD_REQUIRED";
        errorProperty.message = "Email field is required";
    }
    return errorProperty;
}

const isEmpty = function(obj) {
    return Object.keys(obj).length == 0;
}

const validateEmail = function (email) {
    const isEmptyField = email.length == 0;
    const isCorrectEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    let errorMessage = {};
    
    if(isEmptyField)
    {
        errorMessage.code = 422;
        errorMessage.status = "EMAIL_NOT_ALLOWED";
        errorMessage.message = "Email is empty field";
    }

    if(!isCorrectEmail)
    {
        errorMessage.code = 422;
        errorMessage.status = "EMAIL_FORMAT_NOT_ALLOWED";
        errorMessage.message = "Email is not recognized.";
    }

    return errorMessage;
}

const validateName = function (name) {
    let errorMessage = {};
    let isEmptyField = name.length <= 3;
    let isAlphabetic = /^[a-zA-Z\s]*$/.test(name);

    if( isEmptyField || !isAlphabetic)
    {
        errorMessage.code = 422;
        errorMessage.status = "NAME_FORMAT_NOT_ALLOWED";
        errorMessage.message = "Name is not recognized.";
    }
    
    return errorMessage;
}

module.exports = { validationResult, isEmpty, validateName, validateEmail };