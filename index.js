'use strict';

require('dotenv').config();
console.log(process.env.MONGODB_URI, process.env.PORT)
const mongoose = require('mongoose');

const mongooseOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
};
mongoose.connect(process.env.MONGODB_URI, mongooseOptions);

require('./lib/server.js').start(process.env.PORT);
