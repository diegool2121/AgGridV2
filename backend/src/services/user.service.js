const userRepository = require('../repositories/user.repository');

exports.getAllUsers = () => {
  return userRepository.findAll();
};

exports.createUser = (userData) => {
  return userRepository.save(userData);
};
