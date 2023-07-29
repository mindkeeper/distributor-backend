const routes = require("express").Router();
const createCompanyHandler = require("../controllers/companies/createCompany");
const editCompanyHandler = require("../controllers/companies/editCompany");
const getByIdHandler = require("../controllers/companies/getById");
const getCompaniesHandler = require("../controllers/companies/getCompanies");
const verifyDistributorToken = require("../middlewares/authorization/verifyDistributorToken");

routes.post("/new", verifyDistributorToken, createCompanyHandler);
routes.get("/all", verifyDistributorToken, getCompaniesHandler);
routes.get("/:id", verifyDistributorToken, getByIdHandler);
routes.patch("/edit/:id", verifyDistributorToken, editCompanyHandler);

module.exports = routes;
