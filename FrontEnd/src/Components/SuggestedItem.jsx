import { useState, useEffect, lazy } from "react";
import "../styles.css";
import { Link } from "react-router-dom";

function SuggestedItem(props) {
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
    <Link to={`/video/${data._id}`}>
      {" "}
      <div className="suggesteditem">
        <div className="suggestedimage">
          <img
            src={data.thumbnailUrl}
            onLoad={handleImageLoad}
            alt="Video Image"
          />
        </div>

        <div className="suggesteditemdetails">
          <h3>{data.title}</h3>

          <div className="suggestedgrey">
            <p>{data.uploader}</p>
            <p>
              {formatViews(data.views)} views • {timeAgo(data.uploadDate)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default SuggestedItem;
