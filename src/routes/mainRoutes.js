const routes = require("express").Router();
const authRoutes = require("./auth");
const userRoutes = require("./user");
const distributorRoutes = require("./distributor");
const companyRoutes = require("./company");
const prefix = "/api/v1";

routes.use(`${prefix}/auth`, authRoutes);
routes.use(`${prefix}/user`, userRoutes);
routes.use(`${prefix}/distributor`, distributorRoutes);
routes.use(`${prefix}/company`, companyRoutes);

module.exports = routes;
