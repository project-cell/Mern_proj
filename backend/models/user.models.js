import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique: true
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required:true
    },
    profilePicture:{
        type:String,
        default:"https://s3-media0.fl.yelpcdn.com/bphoto/FCb9PEzmX7BCbl49-KmyJQ/348s.jpg",
        
    }

}, {timestamps: true});

const User = mongoose.model('User', userSchema);
export default User;