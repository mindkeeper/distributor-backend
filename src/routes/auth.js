const loginHandler = require("../controllers/auth/loginHandler");
const refreshTokenHandler = require("../controllers/auth/refreshTokenHandler");
const registerHandler = require("../controllers/auth/registerHandler");

const routes = require("express").Router();
routes.post("/register", registerHandler);
routes.post("/login", loginHandler);
routes.post("/refresh-token", refreshTokenHandler);

module.exports = routes;
