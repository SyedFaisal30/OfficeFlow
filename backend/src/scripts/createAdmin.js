import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { Admin } from "../models/admins.models.js";

dotenv.config();

const createAdmin = async () => {
  try {
    console.log("MONGODB_URI:", process.env.MONGODB_URI);
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: "faisal30@gmail.com" });
    if (existingAdmin) {
      console.log("Admin already exists");
      await mongoose.disconnect();
      return;
    }

    const hashedPassword = await bcrypt.hash("faisal23", 10);

    const admin = new Admin({
      email: "faisal30@gmail.com",
      password: hashedPassword,
    });

    await admin.save();
    console.log("✅ Admin created successfully");

    await mongoose.disconnect();
  } catch (error) {
    console.log("❌ Failed to create admin", error);
    process.exit(1);
  }
};

createAdmin();
