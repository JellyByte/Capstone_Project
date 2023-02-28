import {React, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {useAuthState} from 'react-firebase-hooks/auth'
import { getAuth } from 'firebase/auth';


export const Home = () => {
let navigate = useNavigate();
const auth = getAuth();


const handleLogout = () =>{
  sessionStorage.removeItem('Auth Token')
  return auth.currentUser && (()=>{ 
    auth.signOut()
    navigate('/login')
  })


 
}


  return (
    <div>
      

          Hello
          <button onClick={handleLogout()}>Log out</button>

  
      
      </div>
  )
}
