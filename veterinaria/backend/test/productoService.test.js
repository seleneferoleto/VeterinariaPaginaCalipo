import test from "node:test";
import assert from "node:assert/strict";
import { productoService } from "../src/services/productoService.js";
import AppError from "../src/exceptions/AppError.js";

test("CRUD completo de producto en memoria", () => {
  const creado = productoService.crear({ nombre: "Alimento", precio: 1500, stock: 8 });
  assert.equal(creado.id, 1);
  assert.equal(productoService.obtenerTodos().length, 1);
  assert.equal(productoService.obtenerPorId(creado.id).nombre, "Alimento");
  assert.equal(productoService.actualizar(creado.id, { stock: 4 }).stock, 4);
  assert.deepEqual(productoService.eliminar(creado.id), { id: 1, eliminado: true });
  assert.equal(productoService.obtenerTodos().length, 0);
  assert.throws(() => productoService.obtenerPorId(creado.id), AppError);
});

test("valida datos y duplicados", () => {
  assert.throws(() => productoService.crear({ nombre: "", precio: -1, stock: 3 }), { statusCode: 400 });
  const creado = productoService.crear({ nombre: "Correa", precio: 200, stock: 2 });
  assert.throws(() => productoService.crear({ nombre: "correa", precio: 200, stock: 2 }), { statusCode: 409 });
  assert.throws(() => productoService.actualizar(creado.id, { stock: -2 }), { statusCode: 400 });
  productoService.eliminar(creado.id);
});
