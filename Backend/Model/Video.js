import mongoose from "mongoose";
import {commentSchema} from "./Comment.js";

const videoSchema= mongoose.Schema(
    {
        title:{
            type:String,
            required:true
        },

        thumbnailUrl:{
            type:String,
            required:true
        },

        description: {
            type: String,
            required: true
          },

         subscriber:{
          type: String,
          required: true
         } ,

          channelId: {
            type: String,
            required: true
          },
          uploader: {
            type: String,
            required: true
          },

          comments:[commentSchema],
          views: {
            type: Number,
            required: true
          },
          likes: {
            type: Number,
            required: true
          },
          dislikes: {
            type: Number,
            required: true
          },
          category: {
            type: String,
            required: true
          },
          uploadDate: {
            type: Date,
            required: true
          },
          videoLink: {
            type: String,
            required: true
          }


    });

    const Video = mongoose.model("video",videoSchema);

    export default Video;