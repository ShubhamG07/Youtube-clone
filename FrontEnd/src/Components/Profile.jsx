import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { updateProfile } from "../Utils/authSlice";
import "../styles.css";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "", // Read-only
  });

  // Fetch user data from backend when component mounts
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get("http://localhost:3000/users/profile", {
          withCredentials: true,
        });
        setFormData((prevState) => ({
          ...prevState, // Keep any existing values
          fullname: res.data.fullname || "",
          username: res.data.username || "",
          email: res.data.email || "", // Email is still non-editable
        }));
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [dispatch]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        "http://localhost:3000/users/profile",
        formData,
        { withCredentials: true }
      );
      dispatch(updateProfile(res.data)); // Update Redux state
      setMessage("Profile updated successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("Failed to update profile.");
    }
  };

  return (
    <div className="profile-container">
      <div className="name-username-data">
        <div className="biglogoname">
          {user?.fullname ? user.fullname.charAt(0).toUpperCase() : "U"}
        </div>
        <div className="ml-20">
          <p> {user?.fullname ? user.fullname : ""}</p>
          <p className="profileusername">
            @{user ? user.username : ""} •{" "}
            {user?.channelCreated ? (
              <Link to={`/channel/${user._id}`}>View channel</Link>
            ) : (
              ""
            )}{" "}
          </p>
        </div>
      </div>
      <div className="profileformcontainer">
        <h2>User Profile</h2>
        <form onSubmit={handleSubmit} className="profile-form">
          <label>Name:</label>
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            required
          />

          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <label>Email (cannot be changed):</label>
          <input type="email" name="email" value={formData.email} readOnly />

          <button className="signupbutton" type="submit">
            Update Profile
          </button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default UserProfile;
