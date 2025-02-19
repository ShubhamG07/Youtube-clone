import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
  channelName: { type: String, required: true },
  channelHandle: { type: String, required: true, unique: true }, // Unique handle
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Owner
});

const Channel = mongoose.model("Channel", channelSchema);
export default Channel;
