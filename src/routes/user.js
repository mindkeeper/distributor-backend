const getUserHandler = require("../controllers/user/getUserHandler");
const verifyToken = require("../middlewares/authorization/verifyToken");

const routes = require("express").Router();
routes.get("/", verifyToken, getUserHandler);

module.exports = routes;
