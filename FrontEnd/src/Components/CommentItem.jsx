import '../styles.css'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useState,useRef,useEffect } from 'react';

function Comment(props){

    const comment=props.data;
    const id= props.vid;
    const {comments, setComments,newComment,setNewComment}=props.cdata;
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const[editMenu,setEditMenu]=useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(comment.text);
    const inputRef = useRef(null);

    console.log("all comments props",comments);

      // Focus input when `isEditing` is true
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

    // function to toggle small menu on clicking on 3 dot is comment 

    function toggleEditMenu(){
        setEditMenu(!editMenu);
    }

     // Start editing
  const handleEdit = () => {
    console.log("handleedit called");
    setIsEditing(true);
    setEditMenu(false); // Hide options menu
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedText(comment.text); // Reset text to original
  };

  // Save edited comment
  const handleEditComment =  () => {
    handleSaveEdit(comment._id,editedText);
    setIsEditing(false);
  };

//  Delete Comment
       const handleDeleteComment = async (cid) => {
        try {
          await axios.delete(`http://localhost:3000/videos/${id}/comments/${cid}`, {
          });
    
          setComments(comments.filter((c) => c._id !== cid)); // Remove from state
        } catch (error) {
          console.error("Error deleting comment:", error);
        }
      };



  // Save Edited Comment
  const handleSaveEdit = async (cid,editedText) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/videos/${id}/comments/${cid}`,
        {  
            text: editedText,
            user_id:user._id
         },{withCredentials: true }
      );

      setComments(comments.map((c) => (c._id === cid? response.data : c)));
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  function checktoggleMenu(){
    if(editMenu){
        setEditMenu(false);
    }
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

    return(
        <div className="commentdata" onClick={checktoggleMenu}>
        <div className="commentnamelogo"> <i className="fa-solid fa-user fa-lg"></i></div>
        <div className="add-comment">
         <div className={isEditing?"hide":""}><span>@{comment.username}</span> <span className='grey'> {timeAgo(comment.timestamp)}</span></div>
         <p className='commentinput'><input type="text" value={editedText} disabled={!isEditing} ref={inputRef} onChange={(e) => setEditedText(e.target.value)} /></p>
        {isAuthenticated ? (comment.userId==user._id?<div className='edit-delete' onClick={toggleEditMenu}><i className="fa-solid fa-ellipsis-vertical fa-lg"></i></div>:""):""}
      {editMenu?<div className='small-modal' ><p onClick={handleEdit}><i className="fa-solid fa-pencil fa-lg mr-10"></i>Edit</p> 
      <p onClick={()=>handleDeleteComment(comment._id)}><i className="fa-solid fa-trash fa-lg mr-10"></i>Delete</p></div>:""}
        </div>

         {/* Show "Save" and "Cancel" buttons when editing */}
      {isEditing && (
        <div className="edit-actions">
          <button className="commenteditbutton" onClick={ handleEditComment }>Save</button>
          <button className="commenteditbutton" onClick={handleCancelEdit}>Cancel</button>
        </div>
      )}
        </div>
    )


}

export default Comment;