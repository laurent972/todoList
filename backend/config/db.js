const mongoose = require('mongoose');

connectDB().catch(err => {
    console.log(err);
     process.exit();
});


async function connectDB() {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(' connected')
  }

  module.exports = connectDB;