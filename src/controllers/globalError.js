const { Sequelize } = require("../models");
const CustomError = require("../utils/CustomError");

module.exports = (error, req, res, next) => {
  console.log(process.env.NODE_ENV);
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";
  if (process.env.NODE_ENV === "development") devError(res, error);
  if (process.env.NODE_ENV === "production") {
    console.log(error.name);

    if (error instanceof Sequelize.ValidationError)
      error = validationErrorHandler(error);
    if (error instanceof Sequelize.UniqueConstraintError)
      error = duplicateKeyHandler(error);

    if (
      error.name === "SequelizeDatabaseError" &&
      error.parent &&
      error.parent.code === "22P02" &&
      error.parent.routine === "string_to_uuid"
    )
      error = invalidIdHandler(error);
    prodError(res, error);
  }
};

function devError(res, error) {
  console.log(error.name);
  return res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    name: error.name,
    stackTrace: error.stack,
    error,
  });
}

function prodError(res, error) {
  if (error.isOperational)
    return res
      .status(error.statusCode)
      .json({ status: error.status, message: error.message });
  return res.status(500).json({
    status: "Internal Server Error",
    message: "Something went wrong, please try again later!",
  });
}

function invalidIdHandler(err) {
  return new CustomError(err.message, 400);
}

function validationErrorHandler(err) {
  return new CustomError(err.message, 400);
}

function duplicateKeyHandler(err) {
  return new CustomError(err.message, 409);
}