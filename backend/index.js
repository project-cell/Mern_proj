import express from 'express';
const app = express();
const router = express.Router();
import mongoose from 'mongoose';
import dotenv from'dotenv';
import userroutes from './routes/user.js';//routes
import authroutes from './routes/auth.js';//routes
dotenv.config();

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
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use('/backend/user', userroutes);//userroutes use
app.use('/backend/auth',authroutes);// authroutes use
//middleware
// app.use((err,req,res,next)=>{
//     const statusCode =err.statusCode || 500;
//     const message= err.message || 'internal Server Error';
//     return res.status(statusCode).json({
//         success: false,
//         message,
//         statusCode
//     });
//     next();
// }); 

app.listen(3000, () => {
    console.log(`Server listening on port 3000`);
});