import express from "express";
import { getVideos,getSingleVideo,postComment,getComments,updateComment,deleteComment,likeVideo,dislikeVideo } from "../Controller/Video-Controller.js";

const videoRouter= express.Router(); 

videoRouter.get("/",getVideos);
videoRouter.get('/:id',getSingleVideo);
videoRouter.post("/:videoId/comment" ,postComment);
videoRouter.get("/:videoId/comments",getComments);
videoRouter.put("/:videoId/comments/:cid",updateComment);
videoRouter.delete("/:videoId/comments/:cid",deleteComment);
videoRouter.post("/:userId/like/:videoId",likeVideo);
videoRouter.post("/:userId/dislike/:videoId",dislikeVideo);


export default videoRouter;