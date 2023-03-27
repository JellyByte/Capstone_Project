import {React, useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import {useAuthState} from 'react-firebase-hooks/auth'
import { getAuth } from 'firebase/auth';
import {auth,db,storage} from "../../firebase-config"
import { collection, doc, getDocs, setDoc, Timestamp } from "firebase/firestore"; 
import {AuthContext} from "../../context/AuthContext"


export const Home = () => {
  let navigate = useNavigate();
  const auth = getAuth();
  let notificationList = "<br>"

  const { currentUser } = useContext(AuthContext);



  const handleLogout = () =>{
    sessionStorage.removeItem('Auth Token')
    return auth.currentUser && (()=>{ 
      auth.signOut()
      navigate('/login')
    })

  }

  const getNotifications = async () => {
    let list = document.getElementById('p')
    /*
    try {
      const querySnapshot = await getDocs(collection(db, "notifications"))
      querySnapshot.forEach((doc) => {
        if (doc.data().notificationType == "private") {
          if (doc.data().userId == currentUser.uid){
            notificationList += doc.data().text + "<br>"
            list.innerHTML = notificationList
          }
        }
        else {
          notificationList += doc.data().text + "<br>"
          list.innerHTML = notificationList
        }
        
        
      })

      
    }
    catch (error) 
      console.log("error")
    }*/

    try {
      const landlordRef = await getDocs(collection(db, "users"))
      const notificationRef = await getDocs(collection(db, "notifications2"))

      let landlord = ""

      landlordRef.forEach ((element) => {
        if (element.id == currentUser.uid) {
          landlord = element.data().land_lord_id
        }

      })

      notificationRef.forEach((element) => {
        if (element.id == landlord) {
          console.log(element.data().publicNotification)
          for (let i = 0; i < element.data().publicNotification.length; i++) {
            notificationList += element.data().publicNotification[i].text + "<br>"
            list.innerHTML = notificationList
          }
          
        }
          
      })
      
      
    }
    catch (e) {
      console.log("landlord not found")
    }

    
  }

  useEffect(() => {
    getNotifications();
  }, [])


  return (
    <div>
      

          Hello
          <button onClick={handleLogout()}>Log out</button>
          <br />
          <h1>Notifications</h1>
          <p id='p'></p>

  
      
      </div>
  )
}
