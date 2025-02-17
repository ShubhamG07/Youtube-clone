import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { updateUser } from "../Utils/authSlice";
import "../styles.css"

const UserProfile = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "", // Read-only
        password: "",
    });

    // Fetch user data from backend when component mounts
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const res = await axios.get("http://localhost:3000/users/profile", { withCredentials: true });
                setFormData({
                    name: res.data.name,
                    username: res.data.username,
                    email: res.data.email, // Email is not editable
                    password: "", // Do not pre-fill password for security reasons
                });
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };

        fetchUserProfile();
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put("http://localhost:3000/users/profile", formData, { withCredentials: true });
            dispatch(updateUser(res.data)); // Update Redux state
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile.");
        }
    };

    return (
        <div className="profile-container">
            <div className="name-username-data">
            <div className="biglogoname">{user.fullname.charAt(0).toUpperCase()}</div>
            </div>
            <h2>User Profile</h2>
            <form onSubmit={handleSubmit} className="profile-form">
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />

                <label>Username:</label>
                <input type="text" name="username" value={formData.username} onChange={handleChange} required />

                <label>Email (cannot be changed):</label>
                <input type="email" name="email" value={formData.email} readOnly />

                <label>New Password:</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter new password" />

                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
};

export default UserProfile;
