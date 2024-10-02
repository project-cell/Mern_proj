import React, { useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
import {useRef} from 'react';
import { getStorage,ref, uploadBytesResumable,getDownloadURL} from 'firebase/storage';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { updateUserStart,updateUserFailure,updateUserSuccess } from '../redux/user/userSlice';
export default function Profile() 

 {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined)
  const [imagePercent,setImagePercent] =useState(0)
  // console.log(imagePercent)
  const[imageError, setImageError] = useState(false);
  const[formData,setFormData] = useState({});
  const [updateSuccess,setUpdateSuccess] = useState(false);
  
  const {currentUser, loading ,error} = useSelector((state) => state.user)
  useEffect(()=> {
    if(image){
      handleFileUpload(image)
    }
  }, [image]
  );
  const handleFileUpload = async(image) =>{
  const storage = getStorage(app)
  const fileName = new Date().getTime() + image.name;
  const storageRef =ref(storage,fileName);
  const uploadTask = uploadBytesResumable(storageRef,image);
  uploadTask.on('state_changed',
    (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    setImagePercent(Math.round(progress));
    //console.log('Upload is ' + progress + '% done');
    }
  ),
  (error)=>{
    setImageError(true);
  },
    () =>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>
        setFormData({...formData,profilePicture:downloadURL})
      );
    }};
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.id]: e.target.value});
    };

    const handleSubmit =async (e) => {
      e.preventDefault();
      try{
        dispatchEvent(updateUserStart());
        const res = await fetch ('/backend/user/update/$(currentUser._id)',{
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json',
          },
          body: JSON.stringify(formData),

        });
        const data = await res.json();
        if (data.success == false){
          dispatchEvent(updateUserFailure(data));
          return;
        }
        dispatchEvent(updateUserSuccess(data));
        setUpdateSuccess(true);

      }
      catch(error){
        dispatch(updateUserFailure(error));


      }

    };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-4xl text-pink-600 font-serif text-center p-3 '>
        Profile
      </h1>
      <form onSubmit={ handleSubmit} className='flex flex-col gap-4'>
        <input type="file" ref = {fileRef} hidden accept='image/*'
        onChange ={(e) => setImage (e.target.files[0])}/>
        {/* 
        firebase storage rules
      allow read;
      allow write: if
      request.resource.size < 2*1024 *1024 &&
      request.resource.contentType.matches('image/.*') */}

        <img src={formData.profilePicture || currentUser.profilePicture} alt="profile"
        className='h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2' 
        onClick={() => fileRef.current.click()} />
        <p className='text-sm self-center'>
          {imageError ? (
            <span className='text-red-600'>Error Uploading Message</span>)  :
            imagePercent > 0 && imagePercent < 100 ?(
              <span className='text-slate-700'>{'Uploading: $ {imagePercent} +%' }</span>) : imagePercent == 100?(
                <span className='text-green-600'>{'Image Uploaded Successfully!'}</span>): ''}
        </p>
        <input defaultValue = {currentUser.Username} type = "text"
        placeholder = 'Username'
        id='username' 
        className='bg-slate-200 p-3 rounded-lg'
        onChange={handleChange}
        />

         <input defaultValue = {currentUser.email} type = "email"
        placeholder = 'Email'
        id='username' 
        className='bg-slate-200 p-3 rounded-lg'
        onChange={handleChange}
        />
         <input  type = "password"
        placeholder = 'Password'
        id='username' 
        className='bg-slate-200 p-3 rounded-lg' />
        <button className='bg-rose-200 p-3 rounded-full font-semibold uppercase hover:opacity-40 disabled:opacity-85'> update </button>
      </form>
      <div className=' text-center flex justify-between p-3 mt-3 rounded-full'>
        <span className='text-red-700 uppercase cursor-pointer
        font-bold underline'> delete account</span>
        <span className='text-red-700 uppercase cursor-pointer
        font-bold underline'> Sign Out </span>
      </div>
      <p className='bg-red-700 mt-5'> 
        {error && 'Something went wrong!'}
      </p>
      <p className='bg-blue-800 mt-5'> 
        {updateSuccess && 'User is updated successfully'}
      </p>


    </div>
  )
}
