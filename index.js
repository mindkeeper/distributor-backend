require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./src/routes/mainRoutes");
const CustomError = require("./src/utils/CustomError");
const globalError = require("./src/controllers/globalError");
const app = express();

app.use(express.json());
app.use(express.raw());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "*" }));
app.use(routes);

app.all("*", (req, res, next) => {
  const err = new CustomError(
    `cant find ${req.originalUrl} in this server`,
    404
  );
  next(err);
});

app.use(globalError);
app.listen(8080, () => console.log("connceted at port 8080"));
