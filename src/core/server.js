require('dotenv').config();
const chalk = require('chalk');
const app = require('./app');
const connectDB = require('./db');

const PORT = process.env.PORT || 5000;

const server = (async () => {
  try {
    await connectDB(); // pehle DB connect karo

    app.listen(PORT, () => {
      console.log(chalk.green.bold(`✅ Server is running on http://localhost:${PORT}`));
    });

  } catch (error) {
    console.log(chalk.red.bold('❌ Error: Server failed to start!'));
    console.error(error);
  }
})();

// Handle unhandled rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", chalk.red.bold(promise), "reason:", chalk.red.bold(reason));
});

  
  

  process.on('SIGTERM', () => {
    console.log('SIGTERM received, closing server.');
    server.close(() => {
        console.log('Server closed.');
        process.exit(0);
    });
});


  module.exports;