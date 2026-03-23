import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI is not defined");
}

const client = new MongoClient(uri);

let db;

export async function connectDB() {
  try {
    await client.connect();
    db = client.db(); 
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
}

export function getDB() {
  if (!db) {
    throw new Error("Database not connected");
  }
  return db;
}