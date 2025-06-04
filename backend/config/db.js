const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      family: 4,
      maxPoolSize: 10,
      minPoolSize: 5,
      maxIdleTimeMS: 10000,
      retryWrites: true,
      retryReads: true,
      w: "majority",
    });

    // Handle connection events
    mongoose.connection.on("connected", () => {
      console.log(`[INFO] MongoDB Connected: ${conn.connection.host}`);
    });

    mongoose.connection.on("error", (err) => {
      console.error(`[ERROR] MongoDB connection error:`, err);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn(`[WARN] MongoDB disconnected`);
    });

    // Handle process termination
    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      console.log("[INFO] MongoDB connection closed through app termination");
      process.exit(0);
    });

    return conn;
  } catch (error) {
    console.error(`[ERROR] MongoDB connection error:`, error);
    // Don't exit process, let the application handle the error
    throw error;
  }
};

module.exports = connectDB;
