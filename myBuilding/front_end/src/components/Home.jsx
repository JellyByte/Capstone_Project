import {React, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {useAuthState} from 'react-firebase-hooks/auth'
import { getAuth } from 'firebase/auth';
import {auth,db,storage} from "../firebase-config"
import { collection, doc, getDocs, setDoc, Timestamp } from "firebase/firestore"; 



export const Home = () => {
  let navigate = useNavigate();
  const auth = getAuth();
  let notificationList = []


  const handleLogout = () =>{
    sessionStorage.removeItem('Auth Token')
    return auth.currentUser && (()=>{ 
      auth.signOut()
      navigate('/login')
    })

    

  
  }

  const getNotifications = async () => {
    const querySnapshot = await getDocs(collection(db, "notifications"))
    querySnapshot.forEach((doc) => {
      
      const list = {
        value: doc.data().displayName,
        label: doc.data().displayName
      }
      notificationList.push(list)
    })
  }


  return (
    <div>
      

          Hello
          <button onClick={handleLogout()}>Log out</button>
          <br />
          <h1>Notifications</h1>
          <p></p>

  
      
      </div>
  )
}
