import "../styles.css"
import axios from "axios";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import VideoItem from "./Videoitem";


function Channel(){

const {userid } = useParams();
const isMenuOpen = useSelector((state) => state.menu.isMenuOpen);
  const [videos, setVideos] = useState([]);
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    fetchChannel();
    fetchVideos();
  }, [userid]);

  console.log("user id channale",channel);

  // Fetch channel info
  const fetchChannel = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/channel/${userid}`);
      setChannel(response.data);
    } catch (error) {
      console.error("Error fetching channel:", error);
    }
  };

  // Fetch videos by channel handle
  const fetchVideos = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/channel/mychannel/videos`);
      setVideos(response.data);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  console.log("mychannel videos",videos);

  return(
    <div >
<Sidebar />
{channel?
<div className={`channel ${isMenuOpen ? "shift-right" : ""}`}>
 
    <div className="channel-upper">
<div className="channelpagelogo">
{channel.channelName.charAt(0).toUpperCase()}
</div>
<div>
    <p className="channelname">{channel.channelName}</p>
    <p className="channelusername">@{channel.channelHandle}</p>
</div>
    </div>

    <div className="channel-lower">
      <p className="bb2channel block">Videos</p>
      <div className={"videolistchannel"}>
      {videos
            ? videos.map((v) => (
                <VideoItem key={v._id} data={v} />
              ))
            : ""}
        </div>

    </div>
</div> :""

}

    </div>
  )

}

export default Channel;
