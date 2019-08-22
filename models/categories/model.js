'use strict';

const categoriesSchema = require('./schema');
const Model = require('../mongo');


/** Class representing a generic category model. */
class Categories extends Model {

  /**
  * Model Constructor
  * @param schema {object} - mongo schema
  */
  constructor() {
    super(categoriesSchema)
  }

}

module.exports = Categories;
