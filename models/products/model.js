'use strict';

const productsSchema = require('./schema');
const Model = require('../mongo');

class Products extends Model {

  constructor() {
    super(productsSchema)
  }

}

module.exports = Products;
