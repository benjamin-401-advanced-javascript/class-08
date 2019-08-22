'use strict';

const express = require('express');

const router = express.Router()

// Models
const Products = require('./models/products.js');
const productsModel = new Products();

router.post('/', postProduct);

function postProduct(req, res, next) {
  return productsModel.create(req.body)
    .then(newProduct => res.status(201).json(newProduct))
    .catch(error => res.status(500).send('500 ERROR'))
}

modules.exports = router;