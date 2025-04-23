// src/repositories/user.repository.js
const User = require('../models/user');


// Obtener todos los usuarios
exports.findAll = async () => {
  return await User.find();
};

// Guardar un nuevo usuario
exports.save = async (userData) => {
  const user = new User(userData);
  return await user.save();
};
