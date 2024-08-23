const { fetchApiEndpoints } = require("../models/api-models");

exports.getApiEndpoints = (req, res, next) => {
  res.status(200).send(fetchApiEndpoints());
};
