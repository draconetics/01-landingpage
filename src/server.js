const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

//adding gzip library
const compression = require('compression')
// compress all responses
app.use(compression());

//midellware
const morgan = require('morgan');
app.use(morgan('dev'));

//documentation
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));     

//database
const db = require('./config/db.js');

//disabling etag
app.set('etag', false); // turn off
//disabling powered by
app.disable('x-powered-by');





//limit the number of users.
const rateLimit = require("express-rate-limit");
const {maxRequest} = require('./config/maxRequest');
//  apply to all requests
app.use(rateLimit(maxRequest));

//middleware error
const { middlewareErrorDevelopment,  middlewareErrorProduction } = require('./controllers/middleware/middlewareError');
if (process.env.NODE_ENV === 'development') 
{
  app.use(middlewareErrorDevelopment);
}else
{
  app.use(middlewareErrorProduction);
}


//routes
const emailsRoutes = require('./routes/emails');
app.use('/emails', emailsRoutes);
app.get('/',function(req,res){
  let element = 'hello world';
  res.send(element);
});

//default route
const defaultRoute = require('./routes/default');
app.use('/', defaultRoute);

const portConfig = require('./config/portConfig');
db.connect()
  .then(() => {
    console.log('database connected..')
    app.listen(portConfig.PORT, () => {
      console.log('Listening on port: ' + portConfig.PORT);
    });
  });

module.exports = app;