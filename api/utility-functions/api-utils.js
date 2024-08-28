const format = require("pg-format");
const connection = require("../../db/connection");

exports.checkExists = (table_name, column_name, value) => {
  const queryString = format(
    `SELECT * FROM %I WHERE %I = $1`,
    table_name,
    column_name
  );
  return connection.query(queryString, [value]).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({ status: 404, msg: "Not found" });
    } else {
      return "Exists within the database";
    }
  });
};
