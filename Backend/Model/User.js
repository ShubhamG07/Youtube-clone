import mongoose from "mongoose"

//register user schema
const userSignupSchema = mongoose.Schema({ 
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
    }
});



 const User = mongoose.model("User", userSignupSchema);

 export default User;