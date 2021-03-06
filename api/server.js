const dotenv = require('dotenv');

// Handle Uncaught Exception
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: `${__dirname}/config.env` });
const app = require('./app');

require('./startup/db')();

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

// Handle Unhandle Promise Rejection
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
