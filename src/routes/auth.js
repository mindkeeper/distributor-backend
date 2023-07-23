const registerHandler = require("../controllers/auth/registerHandler");

const routes = require("express").Router();
routes.post("/register", registerHandler);

module.exports = routes;
