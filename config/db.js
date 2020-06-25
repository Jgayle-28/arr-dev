const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    // Connect to DB
    const conn = await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log(`Mongo DB connected: ${conn.connection.host}`.green.inverse);
  } catch (err) {
    // If unable to connect to DB log and exit process with failure
    console.log(`${err.message}`.red.inverse);
    process.exit(1);
  }
};

module.exports = connectDB;
