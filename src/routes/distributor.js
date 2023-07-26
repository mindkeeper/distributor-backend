const createDistributorHandler = require("../controllers/distributors/createDistributor");
const getDistributorDetail = require("../controllers/distributors/getDetail");
const verifyToken = require("../middlewares/authorization/verifyToken");

const routes = require("express").Router();
routes.post("/new", verifyToken, createDistributorHandler);
routes.get("/id/:distributorId", verifyToken, getDistributorDetail);

module.exports = routes;
