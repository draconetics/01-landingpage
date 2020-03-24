const mongoose = require('mongoose');
const DB_URI = 'mongodb://localhost:27017/01landingpage';
const DB_TESTING = 'mongodb://localhost:27017/01testing';
    
function connect() {
    return new Promise((resolve, reject) => 
        {
            if (process.env.NODE_ENV === 'test') 
            {
                connectToDataBase(resolve, reject, DB_TESTING);                
            } else 
            {
                connectToDataBase(resolve, reject, DB_URI);                
            }
        }
    );//end promise
}

function connectToDataBase(resolve, reject, url)
{
    mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true,  useUnifiedTopology: true })
        .then(()=> resolve())
        .catch(err => reject(err));
}
    
function close() {
    return mongoose.disconnect();
}

module.exports = { connect, close };