const connection = require("../../db/connection");
const { checkExists } = require("../../api/utility-functions/api-utils");

exports.removeCommentById = (commentid) => {
  const promiseCatcher = [checkExists("comments", "comment_id", commentid)];
  const valueCatcher = [commentid];
  let queryString = `DELETE FROM comments WHERE comment_id = $1`;

  return Promise.all(promiseCatcher).then(() => {
    return connection.query(queryString, valueCatcher).then(({ rowCount }) => {
      return rowCount;
    });
  });
};
