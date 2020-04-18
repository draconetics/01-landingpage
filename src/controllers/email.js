const Email = require('../models/email');
const { ErrorHandler } = require('../models/error');
const { validationResult, isEmpty } = require('./utils/emailValidator');

module.exports = {
    paginatedEmails: function(req, res){
        //console.log("++getting paginated emails.");
        res.status(200).json(res.paginatedResults);
    },
    msg: function( req, res, next ) {
        res.status(200).json({msg: "hello world."});
    },
    newEmail: async function( req, res, next ) {

        const newEmail = new Email(req.body);
        //console.log(newUser);
        const errors = validationResult(req.body);
        if (!isEmpty(errors)) {
            return res.status(422).json(errors);
        }
        
        //console.log("**creating new email");
        await newEmail.save(newEmail)
            .then((emailSaved) => res.status(201).json(emailSaved))
            .catch((err) => {
                let error = new ErrorHandler(500,"SERVER_ERROR",["Error while saving new Email",err]);
                res.status(500).send(error)
            });
    },
}

