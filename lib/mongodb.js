import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]); // ← YAHI FIX HAI

import mongoose from "mongoose";

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

 async function connectDB() {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) throw new Error("MONGODB_URI missing in .env.local");
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000,
      family: 4,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
export default connectDB;