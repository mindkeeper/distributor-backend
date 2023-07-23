const loginHandler = require("../controllers/auth/loginHandler");
const logoutHandler = require("../controllers/auth/logoutHandler");
const registerHandler = require("../controllers/auth/registerHandler");
const isLogin = require("../middlewares/authorization/isLogin");

const routes = require("express").Router();
routes.post("/register", registerHandler);
routes.post("/login", loginHandler);
routes.delete("/logout", isLogin, logoutHandler);

module.exports = routes;
