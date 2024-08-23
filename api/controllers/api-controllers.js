const { fetchApiEndpoints } = require("../models/api-models");
const endpointData = require("../../endpoints.json");

exports.getApiEndpoints = (req, res, next) => {
  res.status(200).send(endpointData);
};
