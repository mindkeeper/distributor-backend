const loginHandler = require("../controllers/auth/loginHandler");
const registerHandler = require("../controllers/auth/registerHandler");

const routes = require("express").Router();
routes.post("/register", registerHandler);
routes.post("/login", loginHandler);

module.exports = routes;
