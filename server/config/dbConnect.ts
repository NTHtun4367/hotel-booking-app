import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    const connectionString =
      process.env.NODE_ENV === "production"
        ? process.env.MONGODB_URI
        : process.env.MONGODB_URI_LOCAL;

    if (!connectionString) {
      throw new Error("MongoDB connection string is not configured.");
    }

    await mongoose.connect(connectionString);
    console.log("Database is connected!");
  } catch (error) {
    console.error("Error connecting to database:", error);
    throw error;
  }
};
