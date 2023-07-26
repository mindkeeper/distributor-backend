const routes = require("express").Router();
const authRoutes = require("./auth");
const userRoutes = require("./user");
const distibutorRoutes = require("./distributor");
const prefix = "/api/v1";

routes.use(`${prefix}/auth`, authRoutes);
routes.use(`${prefix}/user`, userRoutes);
routes.use(`${prefix}/distributor`, distibutorRoutes);

module.exports = routes;
