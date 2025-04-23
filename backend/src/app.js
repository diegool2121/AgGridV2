const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

require('dotenv').config();

const PORT = process.env.PORT || 3000;

// Conexión a MongoDB
const dbURI = process.env.MONGODB_URI;
mongoose.connect(dbURI, {
  dbName: 'AppDB',
})
  .then(() => {
    console.log('Conexión exitosa a MongoDB');
  })
  .catch((error) => {
    console.error('Error de conexión a MongoDB:', error);
  });

// Otras rutas
const userRoutes = require('./routes/user.routes'); 
app.use('/api/users', userRoutes); 

const userExRoutes = require('./routes/userEx.routes');
app.use('/api/userEx', userExRoutes);

const reportRoutes = require('./routes/report.routes'); 
app.use('/api/reporte-usuarios', reportRoutes);

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hola desde el backend de Node.js xd!' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
