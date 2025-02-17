import ReactPlayer from "react-player";
import "../styles.css"
import { useParams } from "react-router-dom";
import useFetch from "../Utils/fetchData";

function VideoPlayer(){

    const {id}=useParams();

    // fetching video from backend api using id attribute from link 

    const { data, error, loading } = useFetch(
        `http://localhost:3000/videos/${id}`
      );


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
          second: 1
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
        if (views < 1_000_000) return (views / 1_000).toFixed(0) + "K";
        if (views < 1_000_000_000) return (views / 1_000_000).toFixed(0) + "M";
        if (views < 1_000_000_000_000) return (views / 1_000_000_000).toFixed(0) + "B";
        return (views / 1_000_000_000_000).toFixed(1) + "T";
      }

   data ? console.log("videoplayer loaded",data):"";
    return(
        <div className="videoplayer">
            <div className="reactplayer">
            {data? <ReactPlayer
        url={data.videoLink}
        controls={true} // Show play, pause, volume, etc.
        width="100%"
        height="100%"
        playing={true} // Set to true to autoplay
         className="react-player"
      /> :""}
            </div>
{data ? <div className="videodetails">
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

        <div >
            <button className="likebutton"><i className="fa-solid fa-thumbs-up fa-xl"></i> &nbsp;{formatViews(data.likes)}</button>
            <button className="dislikebutton"><i className="fa-solid fa-thumbs-down fa-flip-horizontal fa-xl"></i> </button>
            <button className="sharebutton"><i className="fa-solid fa-share fa-xl mlr-10"></i> Share</button>
            <button className="sharebutton"><i className="fa-solid fa-download fa-xl mlr-10"></i> Download</button>
        </div> 

    </div>

    <div className="description">
<h4>{formatViews(data.views)} views &nbsp; {timeAgo(data.uploadDate)}</h4>
<p>{data.description}</p>

    </div>
    </div>
    :""
}
           

            
          
        </div>
    )
}

export default VideoPlayer;