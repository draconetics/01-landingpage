//process.env.NODE_ENV = 'test';
const conn = require('../src/config/db.js'); 

const chai = require('chai')
global.expect = chai.expect

const mongoose = require('mongoose')

//const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/test'

before(function () {
    conn.connect();
})

after(function () {
    conn.close();
})

require('./routes/email/get.spec.js')
require('./routes/email/post.spec.js')

//validator
require('./routes/email/utils/emailValidator.spec')