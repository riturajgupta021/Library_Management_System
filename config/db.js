const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://rituraj:F2yow9TACmLXGkC3@cluster0.xgj5dxs.mongodb.net/library?retryWrites=true&w=majority');
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
