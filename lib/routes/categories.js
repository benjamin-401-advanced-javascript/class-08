'use strict';

const express = require('express');

const router = express.Router()

// Models
const Categories = require('../../models/categories/model.js');
const categoriesModel = new Categories();

// Routes
router.post('/', postCategories);
router.get('/', getCategories);
router.get('/:id', getCategory);
router.put('/:id', putCategories);
router.delete('/:id', deleteCategories);

function getCategories(request, response, next) {
  // expects an array of object to be returned from the model
  categoriesModel.get()
    .then(data => {
      const output = {
        count: data.length,
        results: data,
      };
      response.status(200).json(output);
    })
    .catch(next);
}

function getCategory(request, response, next) {
  // expects an array with the one matching record from the model
  categoriesModel.get(request.params.id)
    .then(result => response.status(200).json(result[0]))
    .catch(next);
}

function postCategories(request, response, next) {
  // expects the record that was just added to the database
  categoriesModel.create(request.body)
    .then(result => response.status(201).json(result))
    .catch(next);
}


function putCategories(request, response, next) {
  // expects the record that was just updated in the database
  categoriesModel.update(request.params.id, request.body)
    .then(result => response.status(200).json(result))
    .catch(next);
}

function deleteCategories(request, response, next) {
  // Expects no return value (resource was deleted)
  categoriesModel.delete(request.params.id)
    .then(result => response.status(200).json(result))
    .catch(next);
}

module.exports = router;

