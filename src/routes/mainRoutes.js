const routes = require("express").Router();
const authRoutes = require("./auth");
const userRoutes = require("./user");
const distributorRoutes = require("./distributor");

const prefix = "/api/v1";

routes.use(`${prefix}/auth`, authRoutes);
routes.use(`${prefix}/user`, userRoutes);
routes.use(`${prefix}/distributor`, distributorRoutes);

module.exports = routes;
