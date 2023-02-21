import React from 'react'
import { NavLink ,useNavigate} from 'react-router-dom';
import {useAuthState} from 'react-firebase-hooks/auth'
import {  signOut } from 'firebase/auth';
import { auth } from '../../firebase-config';

const SignedLinks = () => {
  const navigate = useNavigate();


    
  return (
    
     <>
     
          <NavLink to="/" className=' hidden text-emerald-300 text-base font-medium mr-4 hover:text-fuchsia-200'> Home</NavLink>
          <NavLink to="/listings" className='text-emerald-300 text-base font-medium mr-4 hover:text-fuchsia-200'> Listings</NavLink>
          <NavLink to="/messaging" className='text-emerald-300 text-base font-medium mr-4 hover:text-fuchsia-200'> Messages</NavLink>
          <NavLink to="/profile" className='text-emerald-300 text-base font-medium hover:text-fuchsia-200'> Profile </NavLink>
          <NavLink  className='text-emerald-300 text-base font-medium hover:text-fuchsia-200'> <button  onClick={()=>{signOut(auth).then(()=>{navigate('/')})}}> Log out</button></NavLink>

    </>
     
 
  );
}

export default SignedLinks