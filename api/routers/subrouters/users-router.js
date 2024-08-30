const { getAllUsers } = require("../../controllers/user-controllers");
const usersRouter = require("express").Router();

usersRouter.get("/", getAllUsers);

module.exports = usersRouter;
