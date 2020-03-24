const Email = require('../models/email');
const { validationResult, isEmpty } = require('./utils/emailValidator');

const errorJson = {
    code: "",
    status:"",//METHOD_NOT_ALLOWED
    message:"",//Request method 'DELETE' not supported
    errors:[
        ""//DELETE method is not supported for this request. Supported methods are GET 
    ]
}

module.exports = {
    index: async function(req, res, next){
        console.log("getting emails.")
        await Email.find({})
            .then((notes) => res.status(200).json(notes))
            .catch((err) => res.status(400).send(err));
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
        console.log("**creating new email");
        await newEmail.save(newEmail)
            .then((emailSaved) => res.status(201).json(emailSaved))
            .catch((err) => res.status(400).send(err));
    },
}

