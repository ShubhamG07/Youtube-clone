import ReactPlayer from "react-player";
import "../styles.css";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../Utils/fetchData";
import Suggested from "./SuggestedList";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Comment from "./CommentItem";


function VideoPlayer() {
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [userLiked, setUserLiked] = useState(false);
  const [userDisliked, setUserDisliked] = useState(false);

  // fetching video from backend api using id attribute from link

  const { data, error, loading } = useFetch(
    `http://localhost:3000/videos/${id}`
  );

 
  // fetching comments for a particular video
  useEffect(() => {
    fetchComments();
    fetchUserLikes();
  }, [id]);

  // Fetch user liked/disliked videos
  const fetchUserLikes = async () => {
    if (!user) {return; }

    try {
      const response = await axios.get("http://localhost:3000/users/profile", {
        withCredentials: true,
      });
      setUserLiked(response.data.likedVideos.includes(id));
      setUserDisliked(response.data.dislikedVideos.includes(id));
    } catch (error) {
      console.error("Error fetching user like status:", error);
    }
  };

  // Handle Like
  const handleLike = async () => {
    if (!user) {return navigate("/login");}

    try {
      await axios.post(
        `http://localhost:3000/videos/${user._id}/like/${id}`,
        {}
      );

      setUserLiked(!userLiked);
      setUserDisliked(false); // Remove dislike if user liked
    } catch (error) {
      console.error("Error liking video:", error);
    }
  };
  

  // Handle Dislike
  const handleDislike = async () => {
    if (!user) {return navigate("/login");}

    try {
      await axios.post(
        `http://localhost:3000/videos/${user._id}/dislike/${id}`,
        {}
      );

      setUserDisliked(!userDisliked);
      setUserLiked(false); // Remove like if user disliked
    } catch (error) {
      console.error("Error disliking video:", error);
    }
  };

  // Fetch Comments
  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/videos/${id}/comments`
      );
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };


   // add comment when Enter key is pressed
   const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddComment();
    }
  };

  // Add Comment
  const handleAddComment = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3000/videos/${id}/comment`,
        { text: newComment, user_id: user._id, user_name: user.username }
      );

      setNewComment("");
      fetchComments();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  //   if there is some error or data still loading

  if (error) {
    return (
      <div className="error">
        {" "}
        <h2>Error Occured.Can't fetch the video !</h2>{" "}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="loading">
        <h1> Please Wait while we are loading the video...</h1>
      </div>
    );
  }

  // timeago function to connvert time data in format s,h,d,m,y format
  function timeAgo(uploadDate) {
    const uploadTime = new Date(uploadDate);
    const now = new Date();
    const seconds = Math.floor((now - uploadTime) / 1000);

    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1,
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const count = Math.floor(seconds / secondsInUnit);
      if (count >= 1) {
        return `${count} ${unit}${count > 1 ? "s" : ""} ago`;
      }
    }
    return "Just now";
  }

  // format views function to format views in count format

  function formatViews(views) {
    if (views < 1000) return views.toString();
  if (views < 1000000) return (views / 1000).toFixed(1) + "K";
  if (views < 1000000000) return (views / 1000000).toFixed(1) + "M";
  if (views < 1000000000000) return (views / 1000000000).toFixed(1) + "B";
  return (views / 1000000000000).toFixed(1) + "T";
  }


  //  our component UI starts from here
  return (
    <div>
     
      <div className="videoplayer">
       
          {data?(
             <div className="reactplayer" >
            <ReactPlayer
              url={data.videoLink}
              controls={true}  // Show play, pause, volume, etc.
              width="100%"
              height="100%"
              playing={true} // Set to true to autoplay
              className="react-player"
            />
            </div> 
          ) : (
            null
          )}
       
        {data ? (
          <div className="videodetails">
            <h2>{data.title}</h2>
            <div className="channel-button">
              <div className="flex">
                <div className="channellogo br-50">
                  <img
                    src={data.thumbnailUrl}
                    alt="Channel Logo"
                    className="image"
                    height="50px"
                    width="50px"
                  />
                </div>
                <div className="subscriber">
                  <h3>{data.uploader}</h3>
                  <p>{data.subscriber} subscribers</p>
                </div>

                <div className="subscribebutton">
                  <button>Subscribe</button>
                </div>
              </div>

              <div>
                <button
                  onClick={handleLike}
                  className={`likebutton ${userLiked ? "activelike" : ""}`}
                >
                  <i className="fa-solid fa-thumbs-up fa-xl"></i> &nbsp;
                  {formatViews(data.likes)}
                </button>
                <button
                  onClick={handleDislike}
                  className={`dislikebutton ${
                    userDisliked ? "activelike" : ""
                  }`}
                >
                  <i className="fa-solid fa-thumbs-down fa-flip-horizontal fa-xl"></i>{" "}
                </button>
                <button className="sharebutton">
                  <i className="fa-solid fa-share fa-xl mlr-10"></i> Share
                </button>
                <button className="sharebutton">
                  <i className="fa-solid fa-download fa-xl mlr-10"></i> Download
                </button>
              </div>
            </div>

            <div className="description">
              <h4>
                {formatViews(data.views)} views &nbsp;{" "}
                {timeAgo(data.uploadDate)}
              </h4>
              <p>{data.description}</p>
            </div>

            <div className="comment bt-2 mt-10">
              <h2>{comments.length} comments </h2>
              <div className="commentsection">
                <div className="commentnamelogo">
                  {" "}
                  {user && user.fullname ? (
                    user.fullname.charAt(0).toUpperCase()
                  ) : (
                    <i className="fa-solid fa-user fa-lg"></i>
                  )}
                </div>
                <div className="add-comment">
                  <input
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Add a comment..."
                  />
                  {user ? (
                    <button
                      className="comment-button"
                      onClick={handleAddComment}
                    >
                      Comment
                    </button>
                  ) : (
                    <div>
                      {" "}
                      Sign in to Comment{" "}
                      <button
                        className="comment-button"
                        onClick={() => navigate("/login")}
                      >
                        Sign in
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="all-comments">
                {comments
                  ? comments.map((c,index) => (
                    <Comment 
                        key={c._id ? c._id : `comment-${index}`}
                        data={c}
                        vid={id}
                        cdata={{
                          comments,
                          setComments,
                          newComment,
                          setNewComment,
                        }}
                      />
                    ))
                  : null}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <Suggested vid={id} />
    </div>
  );
}

export default VideoPlayer;
