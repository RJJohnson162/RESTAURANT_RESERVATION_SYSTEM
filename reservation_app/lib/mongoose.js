import mongoose from "mongoose";

export async function mongooseConnect() {
  try {
    if (mongoose.connection.readyState === 1) {
      return mongoose.connection.asPromise();
    } else {
      const uri = process.env.MONGODB_URI;
      await mongoose.connect(uri);
      return mongoose.connection;
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    throw error;
  }
}
