import { useState } from 'react';
import { Link,useNavigate} from 'react-router-dom';
import { signInStart,signInSuccess,signInFailure } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../components/OAuth';
export default function SignIp() {
  const[formData,setFormData] =useState({});
  // const[error,setError] =useState(null);
  // const[loading,setLoading] =useState(false);
  const {loading,error} =useSelector((state)=> state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value});
  }
  //console.log(formData);
  const handleSubmit= async(e)=>{
    e.preventDefault();//no refreshing
    try{
      //setLoading(true);
      dispatch(signInStart());
      const res = await fetch('/backend/auth/signin',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
      });
      const data = await res.json();
      //setLoading(false);
      // dispatch(signInSuccess(data));
      if(data.success==false){
        //setError(true);
        dispatch(signInFailure(data.message))
        return;
      }
      dispatch(signInSuccess(data));

      navigate('/');
      
    }catch(error){
      // setLoading(false);
      // setError(true);
      dispatch(signInFailure(error))
    }
  
  }
  return (
    <div className='p-3 max-w-lg mx-auto gap-5 '>
      <h1 className='text-3xl text-pretty text-center text-rose-700 font-bold gap-2  p-6'> Sign In </h1>
      <form onSubmit={handleSubmit} className ='flex flex-col gap-5'>
        <input type="email" 
        placeholder='Email'
        id='email' 
        className='bg-slate-200 p-3 rounded-lg'
        onChange={handleChange}/>

        <input type="password" 
        placeholder='Password'
        id='password' 
        className='bg-slate-200 p-3 rounded-lg'
        onChange={handleChange}/>

        < button disabled={loading} 
        className='bg-lime-200 text-black font-medium text-center p-3 rounded-lg uppercase hover:opacity-60 outline-lime-500 disabled:opacity-80 gap-4' > {loading?'Loading... ': 'Sign In'} </button>

        <OAuth />
      </form>
      <div className='flex  gap-2 mt-5'>
        <p className='text-pretty text-slate-950 font-medium text-right
        '> Don't have an acoount?</p>
        <Link to="/sign-up" className='text-emerald-950 font-bold text-right'>
        <span className='text-violet-500 '>Sign up</span></Link>
        
      </div>
      <p className='text-red-700 text-ellipsis font-bold mt-2'> {error ? error.message ||'Something went wrong' : ' '}</p>
      
    </div>
  )

}
