import { DEBUG_MODE } from "../config";
import { customErrorHandler } from "../services";
import { ValidationError } from 'joi'

const errorHandler = (error, req, res, next) => {
  let status = 500;
  let data = {
    message: "internal server error",
    ...(DEBUG_MODE === "true" && { original_message: error.message }),
  };

  if (error instanceof customErrorHandler) {
    status = error.status;
    data = {
      message: error.message
    }
  }

  if (error instanceof ValidationError) {
    status = 401;
    data = {
      message: error.message
    }
  }

  res.status(status).json(data);
};

export default errorHandler;
