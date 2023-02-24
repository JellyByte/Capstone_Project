import React, { useState,useContext } from 'react'
import { collection,query,where,getDocs, setDoc, updateDoc, serverTimestamp, getDoc,doc } from 'firebase/firestore'
import {db} from "../firebase-config"
import { AuthContext } from '../context/AuthContext'
//import { Messages } from './Messages'

export const Searchbar = () => {
    const [username,setusername] = useState("") 
    const [user,setuser] = useState(null) 
    const [err,seterr] = useState(false) 
    const { currentUser } = useContext(AuthContext);


    const handleSearch=async ()=>{
        const q = 
        query(collection(db,"users"),
        where("displayName","==",username));

        try{
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
            setuser(doc.data());
            });

        }catch(err){
            seterr(true);


        }

    }

    const handleKeyDown =(e)=>{
        if(e.code === "Enter"){

            console.log(e.code);
            console.log(username)
        }
        e.code ==="Enter" && handleSearch();
    }
    const handleSelect = async ()=>{
        console.log("IMHERE")
        //check whether the group exists(chats collection in firestore) or not, if not create new one
        //create user chats
        const combinedId = currentUser.uid > user.uid 
        ? currentUser.uid+user.uid
        :user.uid+currentUser.uid;
        try{
            const res = await getDoc(doc(db, "chats",combinedId))
            if(!res.exists()){
                //create a chat in chats collection
                await setDoc(doc( db, "chats", combinedId),{messages:[]});
                //create user chats
                await updateDoc(doc(db, "userChats",currentUser.uid),
                {
                    [combinedId+".userInfo"]:{
                        uid:user.uid,
                        displayName:user.displayName,
                        photoURL:user.photoURL

                    },
                    [combinedId+".date"]: serverTimestamp(),
                    
                });
                //the other user
                await updateDoc(doc(db, "userChats",user.uid),
                {
                    [combinedId+".userInfo"]:{
                        uid:currentUser.uid,
                        displayName:currentUser.displayName,
                        photoURL:currentUser.photoURL

                    },
                    [combinedId+".date"]: serverTimestamp(),
                    
                });
               

            }
        }catch(err){
            console.log(err);
        }
        setuser(null);
        setusername("");


    }

  return (
    <div className="border-b-2 border-emerald-300/50">    {/*search */}
        <div className="flex justify-center m-1 pb-2 ">
            <div className=" xl:w-96">
                <div className="input-group relative w-full ">
                    <input 
                            type="text" 
                            className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                            placeholder="Search" 
                            aria-label="Search"  
                            onChange={(e) => setusername(e.target.value)} 
                            value={username}
                            onKeyDown={handleKeyDown}
                        />
                </div>
            </div>
        </div>
            {err&& <span>user not found</span>}


            {user&&
            <div className='p-2 flex justify-start gap-3 cursor-pointer mono  text-base hover:bg-gray-600' onClick={handleSelect}>{/*userchat */}
                <img className='w-14 h-14 rounded-md object-cover' src = {user.photoURL} alt="userImg"></img>
                    <div >{/*userchat info */}
                        <span className=' text-base  capitalize'>{user.displayName}</span>
                        <p className='text-sm bg-slate-400'> </p>

                    </div>
            </div>}
     
        </div>
  )
}
