// Persistencia temporal: el array se reinicia al detener el servidor.
const productos = [];
let proximoId = 1;

export const productoRepository = {
  findAll() {
    return productos.map((producto) => ({ ...producto }));
  },
  findById(id) {
    const producto = productos.find((item) => item.id === id);
    return producto ? { ...producto } : null;
  },
  findByNombre(nombre) {
    const producto = productos.find(
      (item) => item.nombre.toLocaleLowerCase("es") === nombre.toLocaleLowerCase("es")
    );
    return producto ? { ...producto } : null;
  },
  create(datos) {
    const producto = { ...datos, id: proximoId++ };
    productos.push(producto);
    return { ...producto };
  },
  update(id, datos) {
    const index = productos.findIndex((producto) => producto.id === id);
    if (index === -1) return null;
    productos[index] = { ...productos[index], ...datos };
    return { ...productos[index] };
  },
  delete(id) {
    const index = productos.findIndex((producto) => producto.id === id);
    if (index === -1) return false;
    productos.splice(index, 1);
    return true;
  }
};
