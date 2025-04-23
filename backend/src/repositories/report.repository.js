const User = require('../models/userEx');

const getUsuariosPorGrupo = async () => {
  const usuarios = await User.find();
  const conteo = {};

  usuarios.forEach((usuario) => {
    const grupo = usuario.grupo || 'Sin grupo';
    conteo[grupo] = (conteo[grupo] || 0) + 1;
  });

  return conteo;
};

module.exports = { getUsuariosPorGrupo };
