'use strict';

const productsModel = require('./schema');

class Products {

  constructor() {
  }

  get(_id) {
    // Call the appropriate mongoose method to get
    // one or more records
    // If 1, return it as a plain object
    // If 2, return it as an object like this:
    // { count: ##, results: [{}, {}] }

    if (_id) { // Vinicio - if the id is defined
      return productsModel.find({ _id });
    }
    return productsModel.find({});

  }

  create(record) {
    const newRecord = new productsModel(record);
    // Vinicio - this returns a promise that resolves into a new player
    return newRecord.save();
  }

  update(_id, record) {
    // Call the appropriate mongoose method to update a record
    return productsModel.findByIdAndUpdate(_id, record, { new: true });
  }

  delete(_id) {
    // Call the appropriate mongoose method to delete a record
    return productsModel.findByIdAndDelete(_id);
  }

}

module.exports = Products;
