import React from 'react'
import SignedLinks from './SignedLinks'
import SignedOutLinks from './SignedOutLinks'
import { Navigate, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';








 const NavBar = () => {
    //const [user]= useAuthState(auth)

    const { currentUser } = useContext(AuthContext);

    const ProtectedRoute = ({ children }) => {
      if (!currentUser) {
        return <Navigate to="/login" />;
      }
  
      return children
    };




    
  return (
    <header className='bg-slate-600 py-4'>
        <div className='container mx-auto flex justify-between'>
            <NavLink to="/" className='text-emerald-300 text-2xl font-medium mr-4'> myBuilding</NavLink>
            <nav className='flex'>
              <ProtectedRoute>
                <SignedLinks />
              </ProtectedRoute>
                <SignedOutLinks/>
            
              
           

            </nav>    

      
        
            
        </div>     
        
      
    </header>
    
  
        
        

  )

 
}
export default NavBar;
