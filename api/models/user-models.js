const connection = require("../../db/connection");

exports.fetchAllUsers = () => {
  let queryString = `SELECT * FROM users`;

  return connection.query(queryString).then(({ rows }) => {
    return rows;
  });
};

exports.fetchByUsername = (username) => {
  const queryString = "SELECT * FROM users WHERE username = $1";

  return connection.query(queryString, [username]).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({ status: 404, msg: "Not found" });
    } else {
      return rows[0];
    }
  });
};
