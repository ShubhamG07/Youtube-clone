import express from "express";
import { createChannel,getChannel,getChannelVideos } from "../Controller/Channel-Controller.js";

const channelRouter= express.Router();

channelRouter.post("/create",createChannel);
channelRouter.get("/:userid",getChannel);
channelRouter.get("/:handle/videos",getChannelVideos);

export default channelRouter;