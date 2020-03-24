const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const morgan = require('morgan');
//documentation
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

//database
const db = require('./config/db.js');

//midellware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));     

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