const { deleteCommentById } = require("../../controllers/comment-controllers");
const commentsRouter = require("express").Router();

commentsRouter.delete("/:comment_id", deleteCommentById);

module.exports = commentsRouter;
