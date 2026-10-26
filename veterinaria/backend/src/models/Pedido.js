export default class Pedido {
  constructor(id, fecha, estado, clienteId) {
    this.id = id;
    this.fecha = fecha;
    this.estado = estado;
    this.clienteId = clienteId;
  }
}
