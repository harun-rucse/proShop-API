const mongoose = require('mongoose');
const config = require('../config');

module.exports = () => {
  mongoose
    .connect(config.DATABASE_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    })
    .then(() => console.log('DB connection successful!'));
};
