export default class Turno {
  constructor(id, fecha, hora, estado, doctorId, mascotaId) {
    this.id = id;
    this.fecha = fecha;
    this.hora = hora;
    this.estado = estado;
    this.doctorId = doctorId;
    this.mascotaId = mascotaId;
  }
}
