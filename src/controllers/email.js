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
    paginatedResults:  function(model){
        return async (req, res, next) => {
            const page = parseInt(req.query.page) || 1
            const limit = parseInt(req.query.limit) || 5
        
            const startIndex = (page - 1) * limit
            const endIndex = page * limit
        
            const results = {}
        
            if (endIndex < await model.countDocuments().exec()) {
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
              results.results = await model.find().limit(limit).skip(startIndex).exec()
              res.paginatedResults = results
              next()
            } catch (e) {
              res.status(500).json({ message: e.message })
            }
        }
    },
    paginatedEmails: function(req, res){
        console.log("getting paginated emails.");
        res.json(res.paginatedResults);
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

