import React from 'react'
import { NavLink ,useNavigate} from 'react-router-dom';
import {useAuthState} from 'react-firebase-hooks/auth'
import { getAuth } from 'firebase/auth';

const SignedLinks = () => {
    const auth = getAuth()
    const [user]= useAuthState(auth)
    let navigate= useNavigate();

    const handleLogout = () =>{
        sessionStorage.removeItem('Auth Token')
        return auth.currentUser && (()=>{ 
          auth.signOut()
          navigate('/')
        })}
  return (
    
     <>
     
          <NavLink to="/" className=' hidden text-emerald-300 text-base font-medium mr-4 hover:text-fuchsia-200'> Home</NavLink>
          <NavLink to="/listings" className='text-emerald-300 text-base font-medium mr-4 hover:text-fuchsia-200'> Listings</NavLink>
          <NavLink to="/messaging" className='text-emerald-300 text-base font-medium mr-4 hover:text-fuchsia-200'> Messages</NavLink>
          <NavLink to="/profile" className='text-emerald-300 text-base font-medium hover:text-fuchsia-200'> Profile </NavLink>
          <NavLink  className='text-emerald-300 text-base font-medium hover:text-fuchsia-200'> <button  onClick={handleLogout()}> Log out</button></NavLink>

    </>
     
 
  );
}

export default SignedLinks