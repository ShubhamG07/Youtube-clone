import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../Model/User.js"; // Assuming you have a User model

const jwtKey = "securityKey"; // Use  for security





// **User Signup**
export const signupUser= async (req, res) => {
    try {
        let {fullname, username, email, password } = req.body;
        email = email.toLowerCase();

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: "User already exists" });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({ fullname, username, email, password: hashedPassword, likedVideos:[],dislikedVideos:[],channelCreated:false });
        await newUser.save();

      
        res.status(201).json({ message: "User registered successfully! Redirecting to Signin Page...",  user: newUser });
    } catch (error) {
        res.status(500).json({ error: "Error registering user" });
    }
};

// User login 
export const signinUser = async (req, res) => {
    try {
        let { email, password } = req.body;
        email=email.toLowerCase();

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: "User not found" });

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        // Generate JWT Token
        const token = jwt.sign({ id: user._id }, jwtKey, { expiresIn: "2h" });

        // Set token in HTTP-only cookie
        res.cookie("token", token, { httpOnly: true, secure: false, sameSite: "strict" });

        res.status(200).json({ message: "Login successful ! Redirecting to Home Page...", token, user });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ error: "Error logging in" });
    }
}

// logout user 
export const logoutUser =  (req, res) => {
    res.clearCookie("token"); // Remove JWT cookie
    res.json({ message: "Logged out successfully" });
};

// get logged in user details 

export const userProfile =  (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    try {
        const verified = jwt.verify(token,  jwtKey);
        User.findById(verified.id, "-password").then((user) => {
            if (!user) return res.status(404).json({ error: "User not found" });
            res.json(user);
        });
    } catch (error) {
        res.status(403).json({ error: "Invalid token" });
    }
}

// Update Profile
export const updateProfile = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ error: "Unauthorized" });

        const verified = jwt.verify(token, jwtKey);
        const { fullname ,username } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            verified.id,
            { fullname ,username},
            { new: true, select: "-password" }
        );

        res.json({ message: "Profile updated successfully", updatedUser });
    } catch (error) {
        res.status(500).json({ error: "Error updating profile" });
    }
}

export const channelAdded = async (req, res) => {
    try {
       const {user_id} = req.body;


        const updatedUser = await User.findByIdAndUpdate(
            user_id,
            { channelCreated:true},
            { new: true, select: "-password" }
        );

        res.json({ message: "Profile updated successfully", updatedUser });
    } catch (error) {
        res.status(500).json({ error: "Error updating profile" });
    }
}