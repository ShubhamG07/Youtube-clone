import mongoose from "mongoose";
import express from "express";
import videoRouter from "./Routes/Video-Route.js";
import { videoData } from "./utils/mockdata.js";
import Video from "./Model/Video.js";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./Routes/User-Route.js";
import cookieParser from "cookie-parser";
import channelRouter from "./Routes/Channel-Routes.js";


dotenv.config();

// mongoDB connection configuration 
mongoose.connect("mongodb://localhost:27017/");

const db=mongoose.connection;

db.on("open",()=>{
    console.log("connection successful");
});

db.on("error",()=>{
    console.log("connection unsuccessful");
});

 Video.insertMany(videoData)
    .then(data => console.log("Videos inserted in database"))
    .catch(error => console.log("Error inserting Videos:", error));

// creating server with express
const app = new express();

// Use process.env.PORT or default to 3000
const PORT = process.env.PORT || 3000;

// giving port number to our server
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

// using json parsor of express
app.use(express.json());

app.use(cookieParser()); // Parse cookies from requests

app.use(cors({
  origin : true , // This allows all domains
  credentials: true 
})); 



// some common middleware for all request
app.use(
    (req, res, next) => {
      console.log(req.method);
      next();
    },
    (req, res, next) => {
      res.on("finish", () => {
        console.log(`URL :${req.url} , Status Code: ${res.statusCode}`);
      });
  
      next();
    }
  );
  
   // Error-handling middleware
   app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
  });

  // Routes
app.use("/videos", videoRouter);
app.use("/users",userRouter);
app.use("/channel",channelRouter);
