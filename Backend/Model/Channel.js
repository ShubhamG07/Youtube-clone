import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
  channelName: { type: String, required: true },
  channelHandle: { type: String, required: true, unique: true }, // Unique handle
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Owner
  subscribers: { type: Number, default: 7130000 },
  videos: { 
    type: [String], 
    default: [
      "7wnove7K-ZQ", "BsDoLVMnmZs", "vxHUFFiT0OI",  
      "IwlMBvuDk5E", "hKB-YGF14SY", "RGKi6LSPDLU", 
      "TlB_eWDSMt4", "JxzZxdht-XY", "GJoXy8cB3lo"
    ] 
  }
});

const Channel = mongoose.model("Channel", channelSchema);
export default Channel;
