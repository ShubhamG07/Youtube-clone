import mongoose from "mongoose"

//register user schema
const userSignupSchema = mongoose.Schema({ 
    fullname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    likedVideos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }], 
    dislikedVideos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
    channelCreated :{
        type:Boolean,
        default:false
    }
});



 const User = mongoose.model("User", userSignupSchema);

 export default User;