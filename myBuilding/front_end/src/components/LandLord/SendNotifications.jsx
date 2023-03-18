import React, { useRef, useState } from 'react'
import {  createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth,db,storage} from "../../firebase-config"
import { collection, doc, getDocs, setDoc, Timestamp } from "firebase/firestore"; 

export const SendNotifications = () => {
  let time = Timestamp.now();
  const notifyType = useRef(null);
  const [isPublic, setIsPublic] = useState(true);
  const [selectedUser, setSelectedUser] = useState('');
  const [notificationText, setNotificationText] = useState('');

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
