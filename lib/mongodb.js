import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI missing — .env.local mein add karo");
}

// Global cache — dev mein hot reload pe naya connection nahi banega
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  // Already connected hai toh return karo
  if (cached.conn && cached.conn.readyState === 1) {
    return cached.conn;
  }

  // Reset karo agar connection drop ho gaya
  if (cached.conn && cached.conn.readyState !== 1) {
    cached.conn = null;
    cached.promise = null;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      maxPoolSize: 1,          // Vercel serverless ke liye best
      minPoolSize: 1,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 30000,
      heartbeatFrequencyMS: 10000,
      maxIdleTimeMS: 10000,
      family: 4,               // IPv4 force — Vercel DNS fix
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;     // Error pe promise clear karo retry ke liye
    throw err;
  }

  return cached.conn;
}

export default connectDB;