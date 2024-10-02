// export const test = (req,res) =>{
//     res.json({
//         message: 'welcome to mern stack .Our Api is workkng'
//     })
// }
import User from "../models/user.models.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';
export const test=(req,res)=>{
    
    console.log('Received request to /');
try {
  res.json({
    message: 'Welcome to the API .This is user.routes.....HURRAY!!......',
    
  });
} catch (error) {
  console.error(error);
  res.status(500).send('Internal Server Error');
}

};

//update user
export const updateUser =async (req,res,next) =>{
    if (req.user.id !== req.params.id ) {
        //return res.status(401).json({ message: 'You can only update your own account'});
        return next(errorHandler(401, 'You can only update your own account'));

    }
    try {
        if (req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set:{
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    profilepicture: req.body.profilepicture
                }

            },
            {new:true}
        );
        const {password, ...rest} = updatedUser._doc;
        res.status(200).json(updatedUser);

    }catch(error){
        next(error);
    }


}