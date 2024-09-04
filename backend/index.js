import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
//mongoose.connect(process.env.MONGODB_URL)
const mongoURL= 'mongodb://localhost:27017/Projauth';
mongoose.connect(mongoURL,{ })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
      });
const db = mongoose.connection;
db.on("connected",()=>{
    console.log('connected to MongoDb server');
})
db.on("disconnected",()=>{
    console.log('disconnected to MongoDb server',);
})
db.on("error",(error)=>{
    console.log('error in MongoDb server',error);
})




const app = express();
app.listen(3000,() => {
    console.log('Server is running on port 3000');
});