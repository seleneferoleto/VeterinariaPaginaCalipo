import Producto from "../models/Producto.js";
import { productoRepository } from "../repositories/productoRepository.js";
import { BadRequestError, ConflictError, NotFoundError } from "../exceptions/AppError.js";
import { Messages } from "../enums/Messages.js";

const esObjeto = (valor) =>
  valor !== null && typeof valor === "object" && !Array.isArray(valor);

const validarDatos = (datos, parcial = false) => {
  if (!esObjeto(datos)) throw new BadRequestError(Messages.INVALID_DATA);
  const permitidos = ["nombre", "precio", "stock"];
  const campos = Object.keys(datos);
  if (
    campos.some((campo) => !permitidos.includes(campo)) ||
    (parcial && campos.length === 0) ||
    (!parcial && permitidos.some((campo) => !Object.hasOwn(datos, campo)))
  ) {
    throw new BadRequestError(Messages.INVALID_DATA);
  }
  if (
    (Object.hasOwn(datos, "nombre") &&
      (typeof datos.nombre !== "string" || !datos.nombre.trim())) ||
    (Object.hasOwn(datos, "precio") &&
      (typeof datos.precio !== "number" || !Number.isFinite(datos.precio) || datos.precio < 0)) ||
    (Object.hasOwn(datos, "stock") &&
      (!Number.isSafeInteger(datos.stock) || datos.stock < 0))
  ) {
    throw new BadRequestError(Messages.INVALID_DATA);
  }
  return {
    ...datos,
    ...(Object.hasOwn(datos, "nombre") ? { nombre: datos.nombre.trim() } : {})
  };
};

export const productoService = {
  obtenerTodos() {
    return productoRepository.findAll();
  },
  obtenerPorId(id) {
    const producto = productoRepository.findById(id);
    if (!producto) throw new NotFoundError(Messages.PRODUCT_NOT_FOUND);
    return producto;
  },
  crear(datos) {
    const validos = validarDatos(datos);
    if (productoRepository.findByNombre(validos.nombre)) {
      throw new ConflictError(Messages.DUPLICATED_RESOURCE);
    }
    const producto = new Producto(null, validos.nombre, validos.precio, validos.stock);
    return productoRepository.create({
      nombre: producto.nombre, precio: producto.precio, stock: producto.stock
    });
  },
  actualizar(id, datos) {
    this.obtenerPorId(id);
    const validos = validarDatos(datos, true);
    if (validos.nombre) {
      const existente = productoRepository.findByNombre(validos.nombre);
      if (existente && existente.id !== id) {
        throw new ConflictError(Messages.DUPLICATED_RESOURCE);
      }
    }
    return productoRepository.update(id, validos);
  },
  eliminar(id) {
    this.obtenerPorId(id);
    productoRepository.delete(id);
    return { id, eliminado: true };
  }
};
