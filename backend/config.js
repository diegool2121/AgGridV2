// config.js
module.exports = {
    MONGODB_URI: process.env.NODE_ENV === 'production' 
      ? process.env.MONGODB_URI 
      : 'mongodb://localhost:27017/AppDB',
    CORS_ORIGINS: process.env.NODE_ENV === 'production'
      ? ['https://mush-kabmb7at6-diegos-projects-5c0ee9f6.vercel.app/']
      : ['http://localhost:4200']
  };