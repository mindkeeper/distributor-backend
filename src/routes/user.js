const getUserHandler = require("../controllers/user/getUserHandler");

const routes = require("express").Router();
routes.get("/:id", getUserHandler);

module.exports = routes;
