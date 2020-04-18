const mongoose = require('mongoose');
const { MAX_LENGHT_EMAIL, MIN_LENGHT_EMAIL, 
        MAX_LENGHT_NAME, MIN_LENGHT_NAME} = require('../controllers/utils/constants');

const EmailSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: MIN_LENGHT_NAME, 
    maxlength: MAX_LENGHT_NAME,
    required: true
  },
  email: {
    type: String,
    minlength: MIN_LENGHT_EMAIL, 
    maxlength: MAX_LENGHT_EMAIL,
    required: true,
    unique: true
  },
}, { timestamps: {} });

module.exports = mongoose.model('Email', EmailSchema)
