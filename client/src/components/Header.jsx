import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
//import (useSelector) from 'react-redux';

export default function Header() {
  const {currentUser} = useSelector((state) => state.user);

  return (
    <div className='bg-purple-300'>
        <div className=' flex justify-between items-center max-w-6xl mx-auto p-3'>
            <Link to ='/'>
            <h1 className='font-bold text-zinc-950 p-2 size-17
            '> GET AUTHORIZED </h1></Link>
            <ul className='flex gap-4 text-clip font-semibold '>
                <Link to='/home'><li className='font-serif '>Home</li>
                </Link>
                <Link to='/about'><li>About</li></Link>               
                <Link to='/profile'>
                  {currentUser ? (
                  <img src={currentUser.profilePicture} alt="profile" className='h-7  w-7 rounded-full
                  object-cover'/>):( 
                  <li>Sign-in</li>
                  )}
                </Link>               
            

            </ul>
        </div>
    </div>

  )
}
