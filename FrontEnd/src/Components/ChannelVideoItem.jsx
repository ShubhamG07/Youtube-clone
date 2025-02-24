import { useState, useEffect, lazy } from "react";
import "../styles.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch,useSelector } from "react-redux";
import { updateVideo, deleteVideo } from "../Utils/videoSLice";

function ChannelVideoItem(props) {
  const data = props.data;
  const handle=props.handle;
  const [isLoaded, setIsLoaded] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(data.title);
  const [description, setDescription] = useState(data.description);
  const [editMenu, setEditMenu] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const isMenuOpen = useSelector((state) => state.menu.isMenuOpen);

  const dispatch = useDispatch();

  function toggleEditMenu() {
    setEditMenu(!editMenu);
  }

  // Handle Edit Click
  const handleEdit = () => {
    setEditMode(true);
  };

  // Save Updated Video
  const handleSave = async (videoId) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/videos/${data._id}`,
        { title, description }
      );

      // Update Redux store
      dispatch(updateVideo({ data, updatedVideo: response.data }));
      setEditMenu(false);

      setEditMode(false);
    } catch (error) {
      console.error("Error updating video:", error);
    }
  };

  // Delete Video
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this video?")) return;

    try {
      await axios.delete(`http://localhost:3000/videos/${data._id}`);

      // Remove from Redux store
      dispatch(deleteVideo(data._id));
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };

  // function to preload image

  const preloadImage = (url) => {
    const img = new Image();
    img.src = url;
  };

  useEffect(() => {
    preloadImage(data.thumbnailUrl);
  }, [data.thumbnailUrl]);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  // function to calculate time ago of video upload time 

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

  // function to conver views in K,M,B ,T 

  function formatViews(views) {
    if (views < 1000) return views.toString();
    if (views < 1_000_000) return (views / 1_000).toFixed(1) + "K";
    if (views < 1_000_000_000) return (views / 1_000_000).toFixed(1) + "M";
    if (views < 1_000_000_000_000)
      return (views / 1_000_000_000).toFixed(1) + "B";
    return (views / 1_000_000_000_000).toFixed(1) + "T";
  }

  return (
    <div className={`videoitem ${isMenuOpen ? "shiftvideochannelitem800" : ""}`}>
      {editMode ? (
        <div className="editchannelvideo">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="">Description :</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button className="save-editvideo" onClick={() => handleSave()}>
            Save
          </button>
          <button
            className="cancel-editvideo"
            onClick={() => {
              setEditMenu(false);
              setEditMode(false);
            }}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div onClick={()=>editMenu?setEditMenu(false):""} className="channelvideo-container">
          <div className="imagecontainer">
            <Link to={`/video/${data._id}`}>
              <img
                src={data.thumbnailUrl}
                onLoad={handleImageLoad}
                alt="Video Image"
                className={`image ${isLoaded ? "loaded" : ""}`}
              />
            </Link>
          </div>

          <div className="videoitemdetails">
            <div className="channellogo">
              <img
                src={data.thumbnailUrl}
                onLoad={handleImageLoad}
                alt="Channel logo"
                className={`image ${isLoaded ? "loaded" : ""}`}
                height="40px"
                width="40px"
              />
            </div>
            <div className="videodetailsdata">
              <Link to={`/video/${data._id}`}>
                <span>{title}</span>
              </Link>

              <div className="grey">
                <p>{data.uploader}</p>
                <p>
                  {formatViews(data.views)} views • {timeAgo(data.uploadDate)}
                </p>
              </div>
            </div>
            {isAuthenticated?(handle==user.channel?
            <div className="edit-delete-channelvideo">
            <p>
              <i
                onClick={toggleEditMenu}
                className="fa-solid fa-ellipsis-vertical fa-xl pointer"
              ></i>
            </p>
            {editMenu ? (
              <div className="small-channelmodule">
                <p onClick={handleEdit} className="pointer">
                  <i className="fa-solid fa-pencil fa-lg mr-10"></i>Edit
                </p>
                <p onClick={() => handleDelete()} className="pointer">
                  <i className="fa-solid fa-trash fa-lg mr-10"></i>Delete
                </p>
              </div>
            ) : (
              ""
            )}
          </div>:""):""}
          </div>
        </div>
      )}
    </div>
  );
}

export default ChannelVideoItem;
