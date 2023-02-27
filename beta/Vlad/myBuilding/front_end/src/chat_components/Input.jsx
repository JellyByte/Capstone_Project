import React, { useState ,useContext} from 'react'
import Attach from "./img/attach.png";
import Img from "./img/Img.png";
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc  } from 'firebase/firestore';
import {ref,uploadBytesResumable,getDownloadURL} from "firebase/storage"
import { db ,storage} from '../firebase-config';
import { v4 as uuid } from "uuid";

export const Input = () => {
  const [text,setText] = useState("");//for the text imput
  const [img,setImg] = useState(null);//for the message input
  const [err,setErr] = useState(false);


  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);

  //handleSend method
  const handleSend = async () => {
    if (img ) {//for the image
      //const storage = getStorage();
      //console.log(img);
    
      const storageRef = ref(storage, uuid());
      //console.log(storageRef);
  
      await uploadBytesResumable(storageRef, img).then(()=>{
        getDownloadURL(storageRef).then(async (downloadURL)=>{
          try{
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            })


          } catch (err) {
            console.log(err);
            setErr(true);
            //etLoading(false);
          }
        })
      })}else {//for the message

        try{//for updating the actual "chats collection"
          await updateDoc(doc(db, "chats", data.chatId), {
            messages: arrayUnion({
              id: uuid(),//create unique id
              text,//the actual text
              senderId: currentUser.uid,//user id of the sender
              date: Timestamp.now(),//the time it was sent
            }),
          });
          //updating the userChats collection, so we can have the last msgs, but for the current user
          await updateDoc(doc(db,"userChats",currentUser.uid),{
            [data.chatId+".lastMessage"]:{
              text

            },
            [data.chatId+".date"]:serverTimestamp()

          })
           //updating the userChats collection, so we can have the last msgs, but for the user who received the msg
          await updateDoc(doc(db,"userChats",data.user.uid),{
            [data.chatId+".lastMessage"]:{
              text

            },
            [data.chatId+".date"]:serverTimestamp()

          })
          
          

        }catch(err){
          console.log(err);
          setErr(true);
        }
      }
      setText("");
      setImg(null);
   
    }
      



      








     
  
    
  
  return (
    <div className=' p-2.5  font-mono'>


       
        <div className=' flex flex-row space-x-1 justify-around white cursor-pointer'>   

            <input
            type="text"

            className=" w-5/6 tracking-wider  border-none text-lg  focus:ring-0 placeholder:italic "
            placeholder="type something here... "
            onChange={(e)=>setText(e.target.value)}
            value={text}
            />
            <div class="w-2/6 flex flex-row items-center justify-between space-x-2">
                <img className='w-6 h-6 rounded-md object-cover' src={Attach} alt=""s/>
                <input className="hidden" type="file" id='file' onChange={(e)=>setImg(e.target.files[0])} />
                <label htmlFor='file'>
                    <img className='w-6 h-6 object-cover' src={Img} alt=""/>
                </label>
                <button onClick={handleSend} className='w-14 h-10 tracking-wider text-sm bg-green-700 rounded-sm hover:bg-green-600'>send</button>
            </div>
            {err && <span>{err}</span>}
        </div>
        
       
    
            
    </div>
  )
}
