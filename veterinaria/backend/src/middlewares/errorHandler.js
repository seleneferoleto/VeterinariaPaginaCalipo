import AppError from "../exceptions/AppError.js";
import { Messages } from "../enums/Messages.js";
import { ApiResponse } from "../responses/ApiResponse.js";

// Cuatro parámetros: Express reconoce este middleware como manejador de errores.
export const errorHandler = (error, req, res, next) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json(ApiResponse.error(error.message));
  }
  console.error(error);
  return res.status(500).json(ApiResponse.error(Messages.INTERNAL_SERVER_ERROR));
};
