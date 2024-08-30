const { getAllTopics } = require("../../controllers/topic-controllers");
const topicRouter = require("express").Router();

topicRouter.get("/", getAllTopics);

module.exports = topicRouter;
