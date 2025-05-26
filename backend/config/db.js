import mongoose from 'mongoose';

const dbConnection = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/dashboard');
    console.log("connected to db");
  } catch (err) {
    console.error("DB connection error:", err);
  }
};

export default dbConnection;

