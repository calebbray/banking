module.exports = {
  ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 5000,
  URL: process.env.BASE_URL || 'http://localhost:3000',
  MONGODB_URI:
    'mongodb://caleb:Elephant1!@ds243491.mlab.com:43491/fantasy-football',
  SECRET: process.env.SECRET || 'secret1',
  SECRET_OR_KEY: process.env.SECRET_OR_KEY || 'secret'
};
