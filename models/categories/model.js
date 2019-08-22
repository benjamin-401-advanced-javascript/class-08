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

  /**
   * Retrieves one or more records
   * @param _id {string} optional mongo record id
   * @returns {count:#,results:[{*}]} | {*}
   */
  get(_id) {

    if (_id) { // Vinicio - if the id is defined
      return categoriesModel.find({ _id });
    }
    return categoriesModel.find({});

  }

  /**
   * Create a new record
   * @param record {object} matches the format of the schema
   * @returns {*}
   */
  create(record) {
    const newRecord = new categoriesModel(record);
    return newRecord.save();
  }

  /**
   * Replaces a record in the database
   * @param _id {string} Mongo Record ID
   * @param record {object} The record data to replace. ID is a required field
   * @returns {*}
   */
  update(_id, record) {
    return categoriesModel.findByIdAndUpdate(_id, record, { new: true });
  }

  /**
   * Deletes a recod in the model
   * @param _id {string} Mongo Record ID
   * @returns {*}
   */
  delete(_id) {
    return categoriesModel.findByIdAndDelete(_id);
  }

}

module.exports = Categories;
