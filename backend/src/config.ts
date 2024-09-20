import mongoose from 'mongoose';

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL as string);
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Database connection error:", err);
  }
};

export default connectDb;