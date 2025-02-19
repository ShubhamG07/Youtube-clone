import Video from "../Model/Video.js";
import User from "../Model/User.js";

// get videos
export const getVideos = async (req, res) => {

    try {
        const result = await Video.find();
        res.status(200).json({ success: true, message: "All Video List", result })

    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error" });
    }
}

// get single video
export const getSingleVideo = async (req, res) => {
    const id = req.params.id;

    try {

        const result = await Video.findById(id);
        if (!result) {
            return res.status(404).json({ success: false, message: "Video not found" });
        }
        res.status(200).json({ success: true, message: "Video Found", result })

    } catch (error) {

        console.log(error);
        return res.status(500).json({ success: false, message: "Server Error" });

    }
}

// post a comment 

export const postComment =async (req, res) => {
    try {
      const { text,user_id,user_name } = req.body;
      const video = await Video.findById(req.params.videoId);
  
      if (!video) return res.status(404).json({ error: "Video not found" });
  
      // Create a new comment
      const newComment = {
        username:user_name,
        userId: user_id,
        text,
        timestamp: new Date(),
      };
  
      video.comments.unshift(newComment); // Add comment inside the video
      await video.save();
  
      res.status(201).json(newComment);
    } catch (error) {
      res.status(500).json({ error: "Error adding comment" });
    }
  }

//   get all comments on a video 

export const getComments= async (req, res) => {
    try {
      const video = await Video.findById(req.params.videoId);
      if (!video) return res.status(404).json({ error: "Video not found" });
  
      res.status(200).json(video.comments); // ✅ Return comments from video
    } catch (error) {
      res.status(500).json({ error: "Error fetching comments" });
    }
  }

//  update a comment 

export const updateComment =  async (req, res) => {
    try {
      const video = await Video.findById(req.params.videoId);
      if (!video) return res.status(404).json({ error: "Video not found" });
  
      const comment = video.comments.find((v)=>v._id.toString()==req.params.cid);
      if (!comment) return res.status(404).json({ error: "Comment not found" });
  
      if (comment.userId.toString() !== req.body.user_id) {
        return res.status(403).json({ error: "Unauthorized to edit this comment" });
      }
  
      comment.text = req.body.text; // Update comment text
      await video.save();
  
      res.status(200).json(comment);
    } catch (error) {
      res.status(500).json({ error: "Error updating comment" });
    }
  }

//   delete a comment 

export const deleteComment =async (req, res) => {
    try {
      const video = await Video.findById(req.params.videoId);
      if (!video) return res.status(404).json({ error: "Video not found" });
  
      const commentIndex = await video.comments.findIndex(
        (comment) => comment._id.toString() === req.params.cid
      );
  
      console.log(req.params.cid);
  
      if (!commentIndex===-1) return res.status(404).json({ error: "Comment not found" });
  
      video.comments.splice(commentIndex, 1); //  Remove comment
      await video.save();
  
      res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting comment" });
    }
  }


  // like a video 

  export const likeVideo = async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      const video = await Video.findById(req.params.videoId);
      if (!user || !video) return res.status(404).json({ error: "User or Video not found" });
  
      // Remove from dislikes if already disliked
      if (user.dislikedVideos.includes(video._id)){
        video.dislikes -= 1;
        user.dislikedVideos = user.dislikedVideos.filter((id) => id.toString() !== video._id.toString());
  }
      
      
  
      if (user.likedVideos.includes(video._id)) {
        // If already liked, remove the like
        user.likedVideos = user.likedVideos.filter((id) => id.toString() !== video._id.toString());
        video.likes -= 1;
      } else {
        // Otherwise, add to likedVideos
        user.likedVideos.push(video._id);
        video.likes +=1;
      }
  
      await user.save();
      await video.save();
      res.status(200).json({ likedVideos: user.likedVideos, dislikedVideos: user.dislikedVideos, likeCount: video.likes,
        dislikeCount: video.dislikes });
    } catch (error) {
      res.status(500).json({ error: "Error updating like" });
    }
  }

  // dislike a video 

export const dislikeVideo = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const video = await Video.findById(req.params.videoId);
    if (!user || !video) return res.status(404).json({ error: "User or Video not found" });

    // Remove from likes if already liked
    if (user.likedVideos.includes(video._id)){
      video.likes -= 1;
      user.likedVideos = user.likedVideos.filter((id) => id.toString() !== video._id.toString());
}
    

    if (user.dislikedVideos.includes(video._id)) {
      // If already disliked, remove the dislike
      user.dislikedVideos = user.dislikedVideos.filter((id) => id.toString() !== video._id.toString());
      video.dislikes -= 1;
    } else {
      // Otherwise, add to dislikedVideos
      user.dislikedVideos.push(video._id);
      video.dislikes +=1;
    }

    await user.save();
    await video.save();
    res.status(200).json({ likedVideos: user.likedVideos, dislikedVideos: user.dislikedVideos , likeCount: video.likes,
      dislikeCount: video.dislikes });
  } catch (error) {
    res.status(500).json({ error: "Error updating dislike" });
  }
}