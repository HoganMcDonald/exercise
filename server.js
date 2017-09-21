require('dotenv').config();

const express = require('express'),
  app = express();

const index = require('./modules/index');

app.use('/', index);

app.listen(process.env.PORT, ()=> {
  console.log(process.env.PORT);
});
