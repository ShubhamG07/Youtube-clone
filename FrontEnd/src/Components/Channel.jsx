import "../styles.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import ChannelVideoItem from "./ChannelVideoItem";
import { useDispatch, useSelector } from "react-redux";
import { setVideos } from "../Utils/videoSLice";

function Channel() {
  const { handle } = useParams();
  const dispatch = useDispatch();
  const videos = useSelector((state) => state.video.videos);
  const isMenuOpen = useSelector((state) => state.menu.isMenuOpen);
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    fetchChannel();
    fetchVideos();
  }, [handle]);


  // Fetch channel info
  const fetchChannel = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/channel/${handle}`,
        { withCredentials: true }
      );
      setChannel(response.data);
    } catch (error) {
      console.error("Error fetching channel:", error);
    }
  };

  // Fetch videos by channel handle
  const fetchVideos = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/channel/mychannel/videos`,
        { withCredentials: true }
      );
      dispatch(setVideos(response.data));
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  console.log("mychannel videos", videos);

  return (
    <div>
      <Sidebar />
      {channel ? (
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
                ? videos.map((v) => <ChannelVideoItem key={v._id} data={v} handle={handle} />)
                : ""}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Channel;
