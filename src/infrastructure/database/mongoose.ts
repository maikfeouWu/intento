import mongoose from 'mongoose';

export const connectDB = async () => {
  const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/panel-organizador';
  
  try {
    await mongoose.connect(MONGO_URI);
    console.log('[Database] Connected to MongoDB');
  } catch (error) {
    console.error('[Database] Connection failed:', error);
    throw error;
  }
};
