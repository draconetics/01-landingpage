const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const morgan = require('morgan');
//database
const db = require('./config/db.js');


//midellware
app.use(morgan('dev'));
app.use(bodyParser.json());

//routes
const emailsRoutes = require('./routes/emails');
app.use('/emails', emailsRoutes);

db.connect()
  .then(() => {
    console.log('database connected..')
    app.listen(PORT, () => {
      console.log('Listening on port: ' + PORT);
    });
  });

  module.exports = app;