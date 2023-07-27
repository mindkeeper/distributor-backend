const createDistributorHandler = require("../controllers/distributors/createDistributor");
const createTokenHandler = require("../controllers/distributors/createToken");
const getDistributorDetail = require("../controllers/distributors/getDetail");
const verifyToken = require("../middlewares/authorization/verifyToken");
const verifyDistributorToken = require("../middlewares/authorization/verifyDistributorToken");
const addEmployeesHandler = require("../controllers/distributors/addEmployees");
const removeEmployeesHandler = require("../controllers/distributors/removeEmployees");
const routes = require("express").Router();

routes.post("/new", verifyToken, createDistributorHandler);
routes.get("/id/:distributorId", verifyToken, getDistributorDetail);
routes.post("/create-token/:distributorId", verifyToken, createTokenHandler);
routes.post("/employees/new", verifyDistributorToken, addEmployeesHandler);
routes.delete(
  "/employees/remove",
  verifyDistributorToken,
  removeEmployeesHandler
);

module.exports = routes;
