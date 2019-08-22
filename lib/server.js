'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Esoteric Resources
const errorHandler = require('./middleware/error.js');
const notFound = require('./middleware/404.js');



const Categories = require('../models/categories.js');
const categories = new Categories();

// Prepare the express app
const app = express();

// App Level MW
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
const categoryRoutes = req
app.use('/api/v1/categories')

app.get('/api/v1/products', getProducts);
app.post('/api/v1/products', postProducts);
app.get('/api/v1/products/:id', getProduct);
app.put('/api/v1/products/:id', putProducts);
app.delete('/api/v1/products/:id', deleteProducts);

// Catchalls
app.use(notFound);
app.use(errorHandler);

// ROUTE HANDLER FUNCTIONS
function getProducts(request, response, next) {
  // expects an array of objects back
  products.get()
    .then(data => {
      const output = {
        count: data.length,
        results: data,
      };
      response.status(200).json(output);
    })
    .catch(next);
}

function getProduct(request, response, next) {
  // expects an array with one object in it
  products.get(request.params.id)
    .then(result => response.status(200).json(result[0]))
    .catch(next);
}

function postProducts(request, response, next) {
  // expects the record that was just added to the database
  products.post(request.body)
    .then(result => response.status(200).json(result))
    .catch(next);
}


function putProducts(request, response, next) {
  // expects the record that was just updated in the database
  products.put(request.params.id, request.body)
    .then(result => response.status(200).json(result))
    .catch(next);
}

function deleteProducts(request, response, next) {
  // Expects no return value (the resource should be gone)
  products.delete(request.params.id)
    .then(result => response.status(200).json(result))
    .catch(next);
}



module.exports = {
  server: app,
  start: (port) => app.listen(port, () => console.log(`Server up on port ${port}`)),
};
