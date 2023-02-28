import React from 'react'
import { NavLink ,useNavigate} from 'react-router-dom';
import {  signOut } from 'firebase/auth';
import { auth } from '../../firebase-config';

const SignedLinks = () => {
  const navigate = useNavigate();


    
  return (
    
     <div >

       <NavLink to="/" className=' hidden text-emerald-300 text-base font-medium mr-4 hover:text-fuchsia-200'> Home</NavLink>
       <NavLink to="/listings" className='text-emerald-300 text-base font-medium mr-4 hover:text-fuchsia-200'> Listings</NavLink>
       <NavLink to="/messaging" className='text-emerald-300 text-base font-medium mr-4 hover:text-fuchsia-200'> Messages</NavLink>
       <NavLink to="/documents" className='text-emerald-300 text-base font-medium mr-4 hover:text-fuchsia-200'> Documents</NavLink>
       <NavLink to="/sendNotifications" className='text-emerald-300 text-base font-medium mr-4 hover:text-fuchsia-200'> Send Notifications</NavLink>
       <NavLink to="/profile" className='text-emerald-300 text-base font-medium mr-4 hover:text-fuchsia-200'> Profile 
 

       
        </NavLink>
       <NavLink  className='text-emerald-300 text-base font-medium hover:text-fuchsia-200'> <button  onClick={()=>{signOut(auth).then(()=>{navigate('/')})}}> Log out</button></NavLink>

     </div>
     

    
     
 
  );
}

export default SignedLinks