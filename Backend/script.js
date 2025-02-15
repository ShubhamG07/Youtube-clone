import mongoose from "mongoose";
import express from "express";
import videoRouter from "./Routes/Video-Route.js";
import { videoData } from "./utils/mockdata.js";
import Video from "./Model/Video.js";
import cors from "cors";

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

// giving port number to our server
app.listen(3000, () => {
  console.log("server is running on port 3000");
});

// using json parsor of express
app.use(express.json());

app.use(cors()); // This allows all domains



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

