const express = require("express");
const app = express();
const { getAllTopics } = require("./controllers/topic-controllers");

app.get("/api/topics", getAllTopics);

module.exports = { app };
