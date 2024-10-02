import React from 'react'
import {GoogleAuthProvider,signInWithPopup,getAuth} from 'firebase/auth'
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess,signInFailure} from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleClick =async () =>{
        try{
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);
            const res= await fetch('/backend/auth/google',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL,
                }),
            })
            const data = await res.json();
            //setLoading(false);
            // dispatch(signInSuccess(data));
            //console.log(result);
            if(data.success==false){
              //setError(true);
              dispatch(signInFailure(data.message))
              return;
            }
            dispatch(signInSuccess(data));
            dispatch(signInSuccess(data.message));
            navigate('/');

            



        }catch(error){
            console.log('could not login with google', error);
            
        }
    }

  return (
    <button type ='button' onClick ={ handleGoogleClick} className='text-pink-700 font-serif font-bold bg-sky-200
    p-3 bg-blend-lighten rounded-t-lg bg-gradient-to-b hover:opacity-40'> Continue With Google </button>
  )

}