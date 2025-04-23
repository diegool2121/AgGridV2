const userRepository = require('../repositories/userEx.repository');

exports.getAllUsersEx = async (req, res) => {
    try {
        const users = await userRepository.findAllEx();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
    }
    
}
exports.createUserEx = async (req, res) => {
  try {
    const newUser = await userRepository.saveEx(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el usuario', error: error.message });
  }
};
exports.deleteAllUsersEx = async (req, res) => {
    try {
        await userRepository.deleteEx();
        res.status(200).json({ message: 'Todos los usuarios eliminados' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar usuarios', error: error.message });
    }
}