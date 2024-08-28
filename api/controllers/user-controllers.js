const { fetchAllUsers } = require("../models/user-models");

exports.getAllUsers = (req, res, next) => {
  fetchAllUsers().then((users) => {
    res.status(200).send({ users });
  });
};
