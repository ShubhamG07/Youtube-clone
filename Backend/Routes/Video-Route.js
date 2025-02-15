import express from "express";
import { getVideos,getSingleVideo } from "../Controller/Video-Controller.js";

const videoRouter= express.Router(); 

videoRouter.get("/",getVideos);
videoRouter.get('/:id',getSingleVideo);

export default videoRouter;