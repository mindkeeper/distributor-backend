const routes = require("express").Router();
const createCompanyHandler = require("../controllers/companies/createCompany");
const getCompaniesHandler = require("../controllers/companies/getCompanies");
const verifyDistributorToken = require("../middlewares/authorization/verifyDistributorToken");

routes.post("/new", verifyDistributorToken, createCompanyHandler);
routes.get("/all", verifyDistributorToken, getCompaniesHandler);

module.exports = routes;
