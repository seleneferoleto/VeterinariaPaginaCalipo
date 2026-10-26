import { Router } from "express";
import { productoController } from "../controllers/productoController.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();
router.get("/", asyncHandler(productoController.listar));
router.get("/:id", asyncHandler(productoController.obtener));
router.post("/", asyncHandler(productoController.crear));
router.put("/:id", asyncHandler(productoController.actualizar));
router.delete("/:id", asyncHandler(productoController.eliminar));
export default router;
