const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/api');
const app = express();
const port = process.env.port || 4000;

app
  .use(bodyParser.json())
  .use('/api', routes)
  .listen(port || 4000, function() {
    console.log("Listening on port " + port);
  });


