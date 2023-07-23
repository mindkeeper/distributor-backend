const express = require("express");
const cors = require("cors");
const { sequelize } = require("./src/models");

const app = express();

app.use(express.json());
app.use(express.raw());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "*" }));

app.listen(8080, () => console.log("connceted at port 8080"));
// sequelize
//   .sync()
//   .then(() => )
//   .catch((err) => console.log(err));
