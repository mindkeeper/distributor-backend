const editPasswordHandler = require("../controllers/auth/editPasswordHandler");
const loginHandler = require("../controllers/auth/loginHandler");
const refreshTokenHandler = require("../controllers/auth/refreshTokenHandler");
const registerHandler = require("../controllers/auth/registerHandler");
const verifyToken = require("../middlewares/authorization/verifyToken");

const routes = require("express").Router();
routes.post("/register", registerHandler);
routes.post("/login", loginHandler);
routes.post("/refresh-token", refreshTokenHandler);
routes.patch("/edit-password", verifyToken, editPasswordHandler);

module.exports = routes;
