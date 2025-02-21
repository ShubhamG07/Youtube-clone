import { useState, useEffect, lazy } from "react";
import "../styles.css";
import { Link } from "react-router-dom";

function VideoItem(props) {
  const [isLoaded, setIsLoaded] = useState(false);

  const data = props.data;

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

  function formatViews(views) {
    if (views < 1000) return views.toString();
    if (views < 1_000_000) return (views / 1_000).toFixed(1) + "K";
    if (views < 1_000_000_000) return (views / 1_000_000).toFixed(1) + "M";
    if (views < 1_000_000_000_000)
      return (views / 1_000_000_000).toFixed(1) + "B";
    return (views / 1_000_000_000_000).toFixed(1) + "T";
  }

  return (
    <div className="videoitem">
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
            <span>{data.title}</span>
          </Link>

          <div className="grey">
            <p>{data.uploader}</p>
            <p>
              {formatViews(data.views)} views • {timeAgo(data.uploadDate)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoItem;
