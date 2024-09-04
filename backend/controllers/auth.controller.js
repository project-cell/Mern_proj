import User from '../models/user.models.js';
import bcryptjs from 'bcryptjs';
export const signup =async (req,res) =>{
    const {username,email,password/*,confirmPassword*/}=req.body;
    const hashedPassword = bcryptjs.hashSync(password,10);
    const newuser = new User({username,email,password: hashedPassword});
    try{
        await newuser.save()
        res.status(201).json({message: "User created successfully"});

    }catch(error)
    {
        res.status(400).json({message: "Error creating user"});

    }
}