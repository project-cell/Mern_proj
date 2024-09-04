import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div className='bg-purple-300'>
        <div className='flex justify-between items-center'>
            <Link to ='/'>
            <h1 className='text-black text-3xl font-bold text-black'> GET AUTHORIZED </h1></Link>
            <ul className='flex gap-4'>
                <Link to='/home'><li>Home</li>
                </Link>
                <Link to='/about'><li>About</li></Link>               
                <Link to='/signin'><li>Signin</li></Link>               
            

            </ul>
        </div>
    
    
    
    
    
    </div>

  )
}
