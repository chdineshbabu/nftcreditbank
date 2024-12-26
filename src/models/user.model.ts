import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  walletAddress: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { 
    type: String, 
    required: true, 
    enum: ["Admin", "Student"] 
  },
});

const User = mongoose.models.User ||  mongoose.model("User" , UserSchema)
export default User