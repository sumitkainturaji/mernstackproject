import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://kainturasumit190:sumit190@myshop.87vsc.mongodb.net/myDatabaseName'
    );
    console.log('DB Connected');
  } catch (error) {
    console.error('DB Connection Error:', error.message);
    process.exit(1); // Exit process on failure
  }
};
