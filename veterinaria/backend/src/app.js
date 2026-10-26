import express from "express";
import productoRoutes from "./routes/productoRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { NotFoundError } from "./exceptions/AppError.js";
import { Messages } from "./enums/Messages.js";

const app = express();
app.use(express.json());
app.use("/api/productos", productoRoutes);
app.use((req, res, next) => next(new NotFoundError(Messages.ROUTE_NOT_FOUND)));
app.use(errorHandler);
export default app;
