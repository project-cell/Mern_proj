import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div className='bg-purple-300'>
        <div className=' flex justify-between items-center max-w-6xl mx-auto p-3'>
            <Link to ='/'>
            <h1 className='font-bold text-zinc-950 p-2 size-17
            '> GET AUTHORIZED </h1></Link>
            <ul className='flex gap-4 text-balance font-semibold '>
                <Link to='/home'><li>Home</li>
                </Link>
                <Link to='/about'><li>About</li></Link>               
                <Link to='/sign-in'><li>Sign-in</li></Link>               
            

            </ul>
        </div>
    
    
    
    
    
    </div>

  )
}
