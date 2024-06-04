const mongoose = require('mongoose');

connectDB().catch(err => {
    console.log(err);
     process.exit();
});


async function connectDB() {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(' connected')
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
  }

  module.exports = connectDB;