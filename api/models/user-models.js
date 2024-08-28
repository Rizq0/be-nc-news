const connection = require("../../db/connection");

exports.fetchAllUsers = () => {
  let queryString = `SELECT * FROM users`;

  return connection.query(queryString).then(({ rows }) => {
    return rows;
  });
};
