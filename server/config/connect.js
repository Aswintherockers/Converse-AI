import mongoose from "mongoose";
import { config } from "dotenv";

config();

export async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to DB");
  } catch (error) {
    console.log(error);
  }
}
