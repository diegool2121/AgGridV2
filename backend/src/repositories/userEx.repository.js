// src/repositories/user.repository.js
const User = require('../models/userEx'); 

// Obtener todos los usuarios Excel 
exports.findAllEx = async () => {
  return await User.find();
};

// Guardar un nuevo usuario
exports.saveEx = async (userExData) => {
  const user = new User(userExData);
  return await user.save();
};

// Eliminar todos los usuarios
exports.deleteEx = async () => {
  return await User.deleteMany(); // Eliminar todos los usuarios
};
