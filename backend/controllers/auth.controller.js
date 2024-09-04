import User from '../models/user.models.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup =async (req,res,next) =>{
    const {username,email,password/*,confirmPassword*/}=req.body;
    const hashedPassword = bcryptjs.hashSync(password,10);
    const newuser = new User({username,email,password: hashedPassword});
    try{
        await newuser.save()
        res.status(201).json({message: "User created successfully"});

    }catch(error)
    {
        next(error);

    }
};

export const signin = async(req,res,next)=>{
    const {email,password}=req.body;
    try{
        const validUser = await User.findOne({email});
        if(!validUser)
            return next(errorHandler(404,'User not Found'));
        const ValidPassword = bcryptjs.compareSync(password,validUser.password);
        if(!ValidPassword)
            return next(errorHandler(401,'Wrong Credentials'));
        const token = jwt.sign({_id: validUser._id}, process.env.JWT_TOKEN);
        const {password: hashedPassword,...rest}= validUser._doc
        const expiryDate =new Date(Date.now()+36000);
        res
            .cookie('access_token', token,{ httpOnly:true,expires:expiryDate}) 
            .status(200)
            .json(rest)


    }
    catch(err){
        next(err);
    }
}