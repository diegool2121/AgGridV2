const mongooseEx = require('mongoose');

const userExSchema = new mongooseEx.Schema({
  id: { type: String, required: true },
  nombreCompleto: { type: String, required: true },
  fechaNacimiento: { type: Date, required: true },
  direccion: { type: String, required: true },
  localidadCodigoPostal: { type: String, required: true },
  telefono: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  fechaAlta: { type: Date, required: true },
  grupo: { type: String, required: true },
}, { timestamps: true });

const UserEx = mongooseEx.model('UsersEx', userExSchema);

module.exports = UserEx;
