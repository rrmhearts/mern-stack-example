const express = require('express');
var cors = require('cors'); // http header control / cross origin resource sharing
const bodyParser = require('body-parser');
const logger = require('morgan');
const testAPIRouter = require('./routes/testAPI');
const dataAPIRouter = require('./routes/dataAPI');

const API_PORT = 3001;
const app = express();
app.use(cors());
/* Adding this inside cors(*) breaks things
{
    origin: 'http://localhost' // specify origin. Cross-schema, cross-port still allowed
}*/

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// append /api for our http requests
app.use('/api', dataAPIRouter); // attach routers in this file to endpoint /api
app.use("/api", testAPIRouter); // attach route to endpoint.

// Alternative method of doing the above.
/*
router.get('/testAPI', (req, res) => {
   res.send("API is working properly");
});
*/
// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));