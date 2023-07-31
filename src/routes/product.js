const routes = require("express").Router();
const createProductHandler = require("../controllers/product/createProduct");
const verifyDistributorToken = require("../middlewares/authorization/verifyDistributorToken");
routes.post("/new", verifyDistributorToken, createProductHandler);

module.exports = routes;
