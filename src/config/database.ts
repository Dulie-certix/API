import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb+srv://Dulie:Dulie123@cluster0.p80du7q.mongodb.net/Customer';
    await mongoose.connect(mongoUri);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    console.log('Continuing without database connection...');
  }
};

export default connectDB;
