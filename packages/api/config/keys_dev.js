const {
  MONGO_URI = 'mongodb://localhost:27017/db_heens',
  SECRET_KEY = 'app-secret-key',
} = process.env;

module.exports = {
  mongoURI: MONGO_URI,
  secretKey: SECRET_KEY,
};
