import mongoose from "mongoose";

export const commentSchema =mongoose.Schema({
    commentId: {
      type: String,
      required: true
    },
    userId: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      required: true
    }
  });

  const Comment= mongoose.model("comment",commentSchema);

  export default Comment;