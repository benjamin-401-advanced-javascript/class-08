'use strict';

const express = require('express');

const router = express.Router()

// MODELS
const Products = require('../../models/products/model.js');
const productsModel = new Products();

//ROUTES
router.post('/', postProducts);
router.get('/', getProducts);
router.get('/:id', getProduct);
router.put('/:id', putProducts);
router.delete('/:id', deleteProducts);

// ROUTE HANDLER FUNCTIONS
function postProducts(request, response, next) {
  // expects the record that was just added to the database
  productsModel.post(request.body)
    .then(result => response.status(200).json(result))
    .catch(next);
}
function getProducts(request, response, next) {
  // expects an array of objects back
  productsModel.get()
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
  productsModel.get(request.params.id)
    .then(result => response.status(200).json(result[0]))
    .catch(next);
}

function putProducts(request, response, next) {
  // expects the record that was just updated in the database
  productsModel.put(request.params.id, request.body)
    .then(result => response.status(200).json(result))
    .catch(next);
}

function deleteProducts(request, response, next) {
  // Expects no return value (the resource should be gone)
  productsModel.delete(request.params.id)
    .then(result => response.status(200).json(result))
    .catch(next);
}

module.exports = router;