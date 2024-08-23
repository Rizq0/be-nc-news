const { fetchAllTopics } = require("../models/topic.models");

exports.getAllTopics = (req, res, next) => {
  fetchAllTopics().then((rows) => {
    res.status(200).send({ topics: rows });
  });
};
