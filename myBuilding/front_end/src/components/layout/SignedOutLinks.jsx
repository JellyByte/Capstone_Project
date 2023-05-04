import React from 'react'
import { NavLink } from 'react-router-dom';

const SignedOutLinks = () => {
  return (
    <>
    
          <NavLink to="/" className=' hidden text-emerald-300 text-base font-medium mr-4 hover:text-fuchsia-200'> Home</NavLink>
          <NavLink to="/login" className='text-emerald-300 text-base font-medium mr-4 hover:text-fuchsia-200'> Login</NavLink>
          <NavLink to="register" className='text-emerald-300 text-base font-medium mr-4 hover:text-fuchsia-200'> Register</NavLink>
          <NavLink to="about" className='text-emerald-300 text-base font-medium mr-4 hover:text-fuchsia-200'> About</NavLink>
          
    </>
   
  );
}
export default SignedOutLinks