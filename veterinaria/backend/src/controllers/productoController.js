import { productoService } from "../services/productoService.js";
import { ApiResponse } from "../responses/ApiResponse.js";
import { parseId } from "../utils/parseId.js";

export const productoController = {
  listar(req, res) {
    res.status(200).json(ApiResponse.success(productoService.obtenerTodos()));
  },
  obtener(req, res) {
    res.status(200).json(ApiResponse.success(productoService.obtenerPorId(parseId(req.params.id))));
  },
  crear(req, res) {
    res.status(201).json(ApiResponse.success(productoService.crear(req.body)));
  },
  actualizar(req, res) {
    res.status(200).json(ApiResponse.success(productoService.actualizar(parseId(req.params.id), req.body)));
  },
  eliminar(req, res) {
    res.status(200).json(ApiResponse.success(productoService.eliminar(parseId(req.params.id))));
  }
};
