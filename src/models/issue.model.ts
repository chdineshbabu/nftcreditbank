import mongoose from "mongoose";

const IssueSchema = new mongoose.Schema({
  walletAddress: { type: String, required: true },
  name: { type: String, required: true },
  courseName: { type: String, required: true },
  email: { type: String, required: true},
  credits: { type: Number, required: true },
  status: { 
    type: String, 
    required: true, 
    enum: ["Not","Issue", "Approved"] 
  },
});

const Issue = mongoose.models.Issue ||  mongoose.model("Issue" , IssueSchema)
export default Issue