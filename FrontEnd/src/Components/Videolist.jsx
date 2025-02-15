import { useEffect,  useState, lazy, Suspense} from "react";
import useFetch from "../Utils/fetchData";
import '../styles.css'
import { useSelector } from "react-redux";
import VideoItem from "./Videoitem";
import { useParams } from "react-router-dom";
import Sidebar from "./Sidebar";


function Videolist(){

    const isMenuOpen = useSelector((state) => state.menu.isMenuOpen);

    const {query}=useParams();

    const [filteredVideos, setFilteredVideos] = useState(null);

    const [activeButton, setActiveButton] = useState(1);


    const { data, error, loading } = useFetch(
        "http://localhost:3000/videos"
      );

     useEffect(()=>{
        if(data){
            if(query){
                const filterVideo = data.filter((video) => video.title.toLowerCase().includes(query.toLowerCase()) ||
                video.uploader.toLowerCase().includes(query.toLowerCase()))||video.category.toLowerCase().includes(query.toLowerCase());
                setFilteredVideos(filterVideo);

            }
            else{
                setFilteredVideos(data);
            }
           
            
        }
     },[data,query]);

     
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
            <h1> Please Wait while we are loading all products...</h1>
          </div>
        );
      }


      function handleFilter(id,filter) {
        setActiveButton(id);
        if(filter=="all"){
            setFilteredVideos(data);
        }
        else{
        let filterVideo;
        filteredVideos? filterVideo = data.filter((video) => video.category.toLowerCase().includes(filter.toLowerCase()) ||
        video.uploader.toLowerCase().includes(filter.toLowerCase())):"";
        setFilteredVideos(filterVideo);
        }
      }

     filteredVideos? console.log("data",filteredVideos):"";
      

    return(
        <div>
             <Sidebar />
        <div className={`videolist ${isMenuOpen ? "shift-right" : ""}`}>

{filteredVideos ? (filteredVideos.length?
        "" :
        <div className="novideofound">
            <img src="../src/assets/no-video-found.png" alt="" /> 
        <h1>
        No Video Found for term {query}
      </h1>
      <p>
Try different keywords</p>
      </div>
      ) : (
        ""
      )}

        <div className="filterbutton">
            <button className={activeButton === 1 ? "active" : ""} onClick={() => handleFilter(1,"all")}>All</button>
            <button className={activeButton === 2 ? "active" : ""} onClick={() => handleFilter(2,"music")}>Music</button>
            <button className={activeButton === 3 ? "active" : ""} onClick={() => handleFilter(3,"people")}>People</button>
            <button className={activeButton === 4 ? "active" : ""} onClick={() => handleFilter(4,"education")}>Education</button>
            <button className={activeButton === 5 ? "active" : ""} onClick={() => handleFilter(5,"gaming")}>Gaming</button>
            <button className={activeButton === 6 ? "active" : ""} onClick={() => handleFilter(6,"ed sheeran")}>Ed Sheeran</button>
            <button className={activeButton === 7 ? "active" : ""} onClick={() => handleFilter(7,"adele")}>Adele</button>
            <button className={activeButton === 8 ? "active" : ""} onClick={() => handleFilter(8,"coldplay")}>Coldplay</button>
            <button className={activeButton === 9 ? "active" : ""} onClick={() => handleFilter(9,"shakira")}>Shakira</button>
            <button className={activeButton === 10 ? "active" : ""} onClick={() => handleFilter(10,"luis fonsi")}>Luis Fonsi</button>
        </div>
         

         {filteredVideos
            ? filteredVideos.map((v) => (
                <VideoItem key={v._id} data={v} />
              ))
            : ""}
        
          
      


        </div>
        </div>
    )


}

export default Videolist;