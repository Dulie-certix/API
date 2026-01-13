import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    // Try MongoDB Atlas first, then local MongoDB
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/Customer';
    await mongoose.connect(mongoUri);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    console.log('Continuing without database connection...');
  }
};

export default connectDB;
