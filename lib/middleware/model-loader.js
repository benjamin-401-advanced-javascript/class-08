'use strict';

module.exports = (request, response, next) => {
  const modelName = request.params.model;
  const Model = require(`../../models/${modelName}/model.js`)
  request.model = new Model()
  next();
}