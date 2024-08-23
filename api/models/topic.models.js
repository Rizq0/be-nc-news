const connection = require("../../db/connection");

exports.fetchAllTopics = () => {
  let queryString = "SELECT * from topics";

  return connection.query(queryString).then(({ rows }) => {
    return rows;
  });
};
