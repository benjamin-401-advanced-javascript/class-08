'use strict';

const express = require('express');

const modelLoader = require('../middleware/model-loader')

const router = express.Router()

router.param('model', modelLoader);

router.post('/api/v1/:model', handleCreate)
router.get('/api/v1/:model', handleGetAll)
router.get('/api/v1/:model/:id', handleGetOne)
router.put('/api/v1/:model/:id', handleUpdate)
router.delete('/api/v1/:model/:id', handleDelete)


function handleCreate(request, response, next) {
  // expects the record that was just added to the database
  request.model.create(request.body)
    .then(result => response.status(201).json(result))
    .catch(next);
}

function handleGetAll(request, response, next) {
  // expects an array of object to be returned from the model
  request.model.get()
    .then(data => {
      const output = {
        count: data.length,
        results: data,
      };
      response.status(200).json(output);
    })
    .catch(next);
}

function handleGetOne(request, response, next) {
  // expects an array with the one matching record from the model
  request.model.get(request.params.id)
    .then(result => response.status(200).json(result[0]))
    .catch(next);
}


function handleUpdate(request, response, next) {
  // expects the record that was just updated in the database
  request.model.update(request.params.id, request.body)
    .then(result => response.status(200).json(result))
    .catch(next);
}

function handleDelete(request, response, next) {
  // Expects no return value (resource was deleted)
  request.model.delete(request.params.id)
    .then(result => response.status(200).json(result))
    .catch(next);
}

module.exports = router;