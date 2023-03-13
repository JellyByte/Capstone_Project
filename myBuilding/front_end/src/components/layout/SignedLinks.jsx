import React from 'react'
import { NavLink ,useNavigate} from 'react-router-dom';
import {  signOut } from 'firebase/auth';
import { auth } from '../../firebase-config';
import { useState } from 'react';


const SignedLinks = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleToggle = () => {
    setShowMenu(!showMenu);
  };
  


    
  return (
    
     <div >
      

       <NavLink to="/" className=' hidden text-emerald-300 text-base font-medium mr-4 hover:text-fuchsia-200'> Home</NavLink>
       <NavLink to="/listings" className='text-emerald-300 text-base font-medium mr-4 hover:text-fuchsia-200'> Listings</NavLink>
       <NavLink to="/sendNotifications" className='text-emerald-300 text-base font-medium mr-4 hover:text-fuchsia-200'> Send Notifications</NavLink>
       
      <button   className='text-emerald-300 text-base font-medium mr-4 hover:text-fuchsia-200' onClick={handleToggle}>
        Profile
      </button >
       <div className="relative">
      {showMenu && (
        <div className="absolute  right-0 bg-white shadow-lg rounded-lg py-2">
          <NavLink to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
            Edit Profile
          </NavLink>
          <NavLink to="/documents" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
            Documents
          </NavLink>
        

          <NavLink to="/messaging" className="block px-4 py-2 text-gray-800 hover:bg-gray-100"> 
          Messages
          </NavLink>


          <NavLink
            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            onClick={() => {
              signOut(auth).then(() => {
                navigate('/');
              });
            }}
          >
            Log out
          </NavLink>
        </div>
      )}
    </div>
       
       {/* <NavLink to="/profile" className='text-emerald-300 text-base font-medium mr-4 hover:text-fuchsia-200'> Profile 
 

       
        </NavLink> */}
       {/* <NavLink  className='text-emerald-300 text-base font-medium hover:text-fuchsia-200'> <button  onClick={()=>{signOut(auth).then(()=>{navigate('/')})}}> Log out</button></NavLink> */}

     </div>
     

    
     
 
  );
}

export default SignedLinks