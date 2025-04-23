const userExRepository = require('../repositories/userEx.repository');

exports.getAllUsersEx = () => {
  return userExRepository.findAll();
};

exports.createUserEx = (userExData) => {
  return userExRepository.save(userExData);
};

exports.deleteAllUsersEx = () => {
    return userExRepository.deleteEx();
};

