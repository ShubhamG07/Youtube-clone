import "../styles.css";
import { useState, useEffect } from "react";
import useFetch from "../Utils/fetchData";
import SuggestedItem from "./SuggestedItem";

function Suggested(props) {
  const videoid = props.vid;
  const [filteredVideos, setFilteredVideos] = useState(null);

  // fetching videos from backend 

  const { data, error, loading } = useFetch("http://localhost:3000/videos");

  useEffect(() => {
    if (data) {
      const filterVideos = data.filter((v) => v._id != videoid);
      setFilteredVideos(filterVideos);
    }
  }, [data]);

  if (error) {
    return (
      <div className="error">
        {" "}
        <h2>Error Occured.Can't fetch videos !</h2>{" "}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="loading">
        <h1> Please Wait while we are loading all Videos...</h1>
      </div>
    );
  }

  return (
    <div className="suggested">
      {filteredVideos
        ? filteredVideos.map((v) => <SuggestedItem key={v._id} data={v} />)
        : ""}
    </div>
  );
}

export default Suggested;
