import React, { useRef, useState, useContext, useEffect } from 'react'
import {auth,db,storage, app} from "../../firebase-config"
import { collection, doc, getDoc, getDocs, setDoc, updateDoc,addDoc, Timestamp, arrayUnion } from "firebase/firestore"; 
import { AuthContext } from '../../context/AuthContext';
import Dropdown from '../DropDown';

export const SendNotificationsModal = () => {
  const [list, setList] = useState([])
  const [uidList, setUidList] = useState([])
  const [selectedOption, setSelectedOption] = useState(null);
  const [showModal, setShowModal] = React.useState(false);
  const [err, setErr] = useState(false);
  let time = Timestamp.now();
  const notifyType = useRef(null);
  const [isPublic, setIsPublic] = useState(true);
  //const [selectedUser, setSelectedUser] = useState('');
  const [notificationText, setNotificationText] = useState('');
  const { currentUser } = useContext(AuthContext);
  const tenantList = []
  const tenantNameList = []
  const tenantUidList = []

  useEffect(() => {
    getTenantList()
  }, [])

  const getTenantList = async() => {
    const landlordRef = await getDocs(collection(db, "users")) 
    const tenantRef = await getDocs(collection(db, "users")) 
    
    
    landlordRef.forEach ((element) => {
        if (element.id == currentUser.uid) {           
            for (let i = 0; i < element.data().tenants.length; i++) {
 
                let tenantName
                tenantRef.forEach((ten) => {
                    if(ten.id == element.data().tenants[i]) tenantName = ten.data().displayName
                })
                let tenant = {
                    name: tenantName,
                    uid: element.data().tenants[i]
                }
                tenantNameList.push(tenant.name)
                tenantList.push(tenant)
                tenantUidList.push(tenant.uid)
            }
            setList(tenantNameList)
            setUidList(tenantUidList)
        }

    })
    
    //console.log("sendNotifModal")
  }

  const handleOptionSelect = option => {
    setSelectedOption(uidList[list.indexOf(option)])
    console.log(uidList[list.indexOf(option)])
  };

  const handleNotificationTypeChange = (event) => {
    setIsPublic(event.target.value === 'public');
    //setSelectedUser('none');
    //setNotificationText('');
  }

  const handleNotificationTextChange = (event) => {
    setNotificationText(event.target.value);
  }
  
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
          const privateFieldName = {
            time: time,
            tenant_id: selectedOption,
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
          const privateFieldName = {
            time: time,
            tenant_id: selectedOption,
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
    <>
      <button
        className="bg-emerald-600 text-white font-bold uppercase px-6 py-3 rounded-lg shadow-md hover:bg-emerald-700 focus:outline-none"
        type="button"
        onClick={() => setShowModal(true)}
      >
        send notification
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-sm">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Send Notification</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  {err && (
                    <div>
                      <div
                        class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
                        role="alert"
                      >
                        <p class="font-bold">Be Warned</p>
                        <p>please select a picture to upload</p>
                      </div>
                    </div>
                  )}
                  <p className=" text-slate-500 text-lg leading-relaxed flex justify-center">
                    Send Notifications
                  </p>
                  {/* <UploadForm ref = {childRef}/> */}
                  <div>{err && <p>Error uploading form data</p>}</div>
                </div>
                <div className="px-2 flex flex-col gap-2">
                    <input
                            className="px-4 py-2 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="text"
                            placeholder="Type notification here"
                            onChange={handleNotificationTextChange} 
                            value={notificationText}
                        />
                        <select 
                            className="px-4 py-2 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            name="notificationType" ref={notifyType} 
                            onChange={handleNotificationTypeChange} 
                            value={isPublic ? 'public' : 'private'}>
                            <option value="public">Landlord Notification</option>
                            <option value="private">Tenant Alert</option>
                        </select>
                        <Dropdown 
                            options={list} 
                            placeholder="Search tenant..."
                            onOptionSelect={handleOptionSelect}
                        />
                </div>
                    
                        
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => {
                        setErr(false);
                        setShowModal(false);
                      }}
                    >
                      Close
                    </button>

                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="submit"
                      onClick={() => {
                        addNotification();
                        setShowModal(false);
                      }}
                      //onClick={handleSubmit}
                    >
                      Send
                    </button>
                  </div>
                
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};
