import {React, useEffect, useContext, useState} from 'react'
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
  const [activeTab, setActiveTab] = useState(1);
  const [testContent, setTestContent] = useState("");

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };



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
    catch (error) {
      console.log("error")
    }*/

    try {
      const landlordRef = await getDocs(collection(db, "users"))
      const notificationRef = await getDocs(collection(db, "notifications2"))
      

      let landlord = ""
      let newContent = "";

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
            //list.innerHTML = notificationList
            newContent += element.data().publicNotification[i].text + "<br>";
          }
          
        }
          
      })
      setTestContent(newContent);
      
    }
    catch (e) {
      console.log("landlord not found")
    }

    
  }

  useEffect(() => {
    getNotifications();
    //document.getElementById("test").innerText = "testing"
  }, [])


  return (
  <div className="flex flex-col items-center justify-center md:flex-row md:justify-between">
    <div>
      Hello
      <button onClick={handleLogout}>Log out</button>
      <h1>Notifications</h1>
      <p id='p'></p>
    </div>

    <div className="w-full md:w-auto mt-4 md:mt-0 ml-0 md:ml-4">
      <div className="h-80 w-full overflow-auto border p-4 rounded-lg shadow-lg transition duration-300">
        <div className="flex justify-between border-b border-gray-500 pb-2 mb-2">
          <button
            className={`px-4 py-2  ${
              activeTab === 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'
            }`}
            onClick={() => handleTabClick(1)}
          >
            Announcements
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === 2 ? 'bg-blue-500 text-white' : 'bg-gray-300'
            }`}
            onClick={() => handleTabClick(2)}
          >
            Landlord Alerts
          </button>
          <button
            className={`px-4 py-2  ${
              activeTab === 3 ? 'bg-blue-500 text-white' : 'bg-gray-300'
            }`}
            onClick={() => handleTabClick(3)}
          >
            Other
          </button>
        </div>
        <div>
          {activeTab === 1 && <p dangerouslySetInnerHTML={{ __html: testContent }}></p>}
          {activeTab === 2 && <p>Tab 2 content goes here.</p>}
          {activeTab === 3 && <p>Tab 3 content goes here.</p>}
        </div>
      </div>
    </div>
  </div>
  )
}

