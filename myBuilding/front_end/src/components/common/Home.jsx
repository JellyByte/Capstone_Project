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
  const [publicNotification, setPublicNotification] = useState("");
  const [privateNotification, setPrivateNotification] = useState("")

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
    try {
      const landlordRef = await getDocs(collection(db, "users"))
      const notificationRef = await getDocs(collection(db, "notifications2"))
      

      let landlord = ""
      let publicContent = ""
      let privateContent = ""
      let date = ""
      let timestamp = ""

      landlordRef.forEach ((element) => {
        if (element.id == currentUser.uid) {
          landlord = element.data().land_lord_id 
        }

      })

      notificationRef.forEach((element) => {
        if (element.id == landlord) {
          console.log(element.data().publicNotification)
          for (let i = 0; i < element.data().privateNotification.length; i++) {
            if (element.data().privateNotification[i].tenant_id === currentUser.uid){
              privateContent += element.data().privateNotification[i].text + "<br>"
              //timestamp = element.data().privateNotification[i].time
              //date = timestamp.getHours() + ":" + timestamp.getMinutes() + ", "+ timestamp.toDateString()
              //privateContent += date + "<br>"
            }
            
          }

          for (let i = 0; i < element.data().publicNotification.length; i++) {
            publicContent += element.data().publicNotification[i].text + "<br>";
            //publicContent += element.data().publicNotification[i].time + "<br>";
          }
          
        }
          
      })

      setPublicNotification(publicContent);
      setPrivateNotification(privateContent);
      
      
    }
    catch (e) {
      console.log("landlord not found")
    }

    
  }



  useEffect(() => {
    getNotifications();
  }, [])


  return (
  <div >
    <div className="flex flex-col items-center justify-center md:flex-row md:justify-between">
      <div>
        <h1></h1>
        <p id='p'></p>
      </div>

      <div className="w-full md:w-auto mt-4 md:mt-0 ml-0 md:ml-4">
        <div className="h-80 w-full overflow-auto border p-4 rounded-lg shadow-lg transition duration-300">
          <div className="">Notifications</div>
          
          <div className="flex justify-between border-b border-gray-500 pb-2 mb-2">
            
            <button
              className={`px-4 py-2  ${
                activeTab === 1 ? 'bg-emerald-500 text-white' : 'bg-gray-300'
              }`}
              onClick={() => handleTabClick(1)}
            >
              Announcements
            </button>
            <button
              className={`px-4 py-2 ${
                activeTab === 2 ? 'bg-emerald-500 text-white' : 'bg-gray-300'
              }`}
              onClick={() => handleTabClick(2)}
            >
              Landlord Alerts
            </button>
            <button
              className={`px-4 py-2  ${
                activeTab === 3 ? 'bg-red-500 text-white' : 'bg-gray-300'
              }`}
              onClick={() => handleTabClick(3)}
            >
              Update
            </button>
          </div>
          <div>
            {activeTab === 1 && <p dangerouslySetInnerHTML={{ __html: publicNotification }}></p>}
            {activeTab === 2 && <p dangerouslySetInnerHTML={{ __html: privateNotification }}></p>}
            {activeTab === 3 && <p>Updates goes here.</p>}
          </div>
        </div>
        
      </div>
      <div>    
      </div>
      
    </div>

    <div>
      <p className='font-bold'>Information</p>
      <p>MyBuilding is a tenant/landlord management app that allows tenants to search for apartments and rent them out directly through the app. Payment can also be made through the app. A built-in messaging system allows for communication between tenants and their landlord, as well as with other tenants in the building. Landlords can add apartments to the app and send notifications, notices, and leases directly through the app. The app also includes a documents section to hold all important documents related to the lease and notices.</p>  
    </div>
    
  </div>
  )
}

