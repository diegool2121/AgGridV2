const userRepository = require('../repositories/user.repository');

exports.getUsers = async (req, res) => {
  try {
    const users = await userRepository.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const newUser = await userRepository.save(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el usuario', error: error.message });
  }
};
