import React, { useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
import {useRef} from 'react';
import { getStorage,ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';

export default function Profile() 

 {
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined)
  const [imagePercent,setImagePercent] =useState(0)
  console.log(imagePercent)
  const[imageError, setImageError] = useState(false);
  const[formData,setFormData] = useState({

  });
  
  const {currentUser} = useSelector((state) => state.user)
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
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-4xl text-pink-600 font-serif text-center p-3 '>
        Profile
      </h1>
      <form className='flex flex-col gap-4'>
        <input type="file" ref = {fileRef} hidden accept='image/*'
        onChange ={(e) => setImage (e.target.files[0])}/>
        {/* 
        firebase storage rules
      allow read;
      allow write: if
      request.resource.size < 2*1024 *1024 &&
      request.resource.contentType.matches('image/.*') */}

        <img src={currentUser.profilePicture} alt="profile"
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
        className='bg-slate-200 p-3 rounded-lg' />
         <input defaultValue = {currentUser.email} type = "email"
        placeholder = 'Email'
        id='username' 
        className='bg-slate-200 p-3 rounded-lg' />
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


    </div>
  )
}
