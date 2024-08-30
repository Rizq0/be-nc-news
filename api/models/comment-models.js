const connection = require("../../db/connection");
const { checkExists } = require("../../api/utility-functions/api-utils");

exports.removeCommentById = (commentid) => {
  const promiseCatcher = [checkExists("comments", "comment_id", commentid)];
  const valueCatcher = [commentid];
  const queryString = `DELETE FROM comments WHERE comment_id = $1`;

  return Promise.all(promiseCatcher).then(() => {
    return connection.query(queryString, valueCatcher).then(({ rowCount }) => {
      return rowCount;
    });
  });
};

exports.updateCommentById = (voteChange, commentId) => {
  const queryString =
    "UPDATE comments SET votes = votes + $1 WHERE comment_id = $2 RETURNING *";

  return checkExists("comments", "comment_id", commentId).then(() => {
    return connection
      .query(queryString, [voteChange, commentId])
      .then(({ rows }) => {
        return rows[0];
      });
  });
};
