import React, { useRef, useState, useContext } from 'react'
import {  createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth,db,storage, app} from "../../firebase-config"
import { collection, doc, getDoc, setDoc, updateDoc,addDoc, Timestamp, arrayUnion } from "firebase/firestore"; 
import { AuthContext } from '../../context/AuthContext';



export const SendNotifications = () => {
  let time = Timestamp.now();
  const notifyType = useRef(null);
  const [isPublic, setIsPublic] = useState(true);
  const [selectedUser, setSelectedUser] = useState('');
  const [notificationText, setNotificationText] = useState('');
  const { currentUser } = useContext(AuthContext);

  const handleNotificationTypeChange = (event) => {
    setIsPublic(event.target.value === 'public');
    setSelectedUser('none');
    //setNotificationText('');
  }

  const handleSelectedUserChange = (event) => {
    setSelectedUser(event.target.value);
  }

  const handleNotificationTextChange = (event) => {
    setNotificationText(event.target.value);
  }
  
  /*
  const addNotification = async () => {
    try {
      const newDoc = doc(collection(db, "notifications"))
      const userId = isPublic ? 'none' : selectedUser;
      await setDoc(newDoc, {
        date: time,
        notificationType: isPublic ? 'public' : 'private',
        text: notificationText, 
        userId: userId
      });
    } catch (err) {
      console.log("Notification Failed")
      console.log(time)
      console.log(isPublic)
      console.log(notificationText)
      console.log(selectedUser)
    }
  }*/
  const addNotification = async () => {
    try {
      const notificationCollectionRef = collection(db, "notifications2")
      const notificationDocRef = doc(notificationCollectionRef, currentUser.uid)

      const notificationDoc = await getDoc(notificationDocRef)
      if (notificationDoc.exists())  {
        if (isPublic) {
          const publicFieldName = {
            time: time,
            text: notificationText
          }
  
          
          await updateDoc(notificationDocRef, {
            publicNotification: arrayUnion(publicFieldName),
          })
        }
        else {
          const userId = isPublic ? 'none' : selectedUser;
          const privateFieldName = {
            time: time,
            tenant_id: userId,
            text: notificationText
          }
          await updateDoc(notificationDocRef, {
            privateNotification: arrayUnion(privateFieldName),
          })
        }
      }

      else {
        if (isPublic) {
          const publicFieldName = {
            time: time,
            text: notificationText
          }
  
          
          await setDoc(notificationDocRef, {
            publicNotification: [publicFieldName],
          })
        }
        else {
          const userId = isPublic ? 'none' : selectedUser;
          const privateFieldName = {
            time: time,
            tenant_id: userId,
            text: notificationText
          }
          await setDoc(notificationDocRef, {
            privateNotification: [privateFieldName],
          })
        }
      }

      
    }
    catch (error) {
      console.log(error)
      
    }
  }

  return (
    <div>
      <h1>Send Notifications</h1> 
      <input type="text" name="text" id="text" placeholder='notification text here' onChange={handleNotificationTextChange} value={notificationText} />
      <br /><br />

      Public Notification
      <select name="notificationType" ref={notifyType} onChange={handleNotificationTypeChange} value={isPublic ? 'public' : 'private'}>
        <option value="public">True</option>
        <option value="private">False</option>
      </select>
      <br />

      User: 
      <input id="getUser" type="text" placeholder='type user here' onChange={handleSelectedUserChange} value={selectedUser} readOnly={isPublic} />
      <br /> <br />
      <button onClick={addNotification}>Publish</button>
    </div>
  )
}
