import Channel from "../Model/Channel.js";
import Video from "../Model/Video.js";
import jwt from "jsonwebtoken";

const jwtKey = "securityKey";

// Create a Channel
export const createChannel = async (req, res) => {
  try {
    const { channelName, channelHandle, user_id } = req.body;

    // Check if handle is unique
    const existingChannel = await Channel.findOne({ channelHandle });
    if (existingChannel)
      return res.status(400).json({ error: "Handle already taken!" });

    // Create new channel
    const newChannel = new Channel({
      channelName,
      channelHandle,
      userId: user_id,
    });

    await newChannel.save();
    res.status(201).json(newChannel);
  } catch (error) {
    res.status(500).json({ error: "Error creating channel" });
  }
};

// Get a Channel by Handle
export const getChannel = async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const verified = jwt.verify(token, jwtKey);
    if (verified.id !== req.params.userid)
      return res.status(403).json({ error: "channel belong to other user" });
    const channel = await Channel.findOne({ userId: req.params.userid });
    if (!channel) return res.status(404).json({ error: "Channel not found" });

    res.status(200).json(channel);
  } catch (error) {
    res.status(500).json({ error: "Error fetching channel" });
  }
};

// Get Videos by Channel Handle
export const getChannelVideos = async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    // Fetch videos where `uploader` matches the channel handle
    const videos = await Video.find({ uploader: req.params.handle });
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ error: "Error fetching videos" });
  }
};
