import React from "react";
import {MyComponent} from "../svgs/addIcon";
import { useState,useEffect} from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {ref,uploadBytesResumable,getDownloadURL, deleteObject} from "firebase/storage"
import {db,storage} from "../../firebase-config"
import { v4 as uuid } from "uuid";
import { doc,  updateDoc  } from 'firebase/firestore';
import { updateProfile } from "firebase/auth";
import { getMetadata } from "firebase/storage";
//import { LoadingContext } from "../../context/LoadingContext";




export default function Modal(props) {

    const {currentUser,GenericPhotoUrl,setLoading} = useContext(AuthContext);
    
    const [showModal, setShowModal] = React.useState(false);
    const [img,setImg] = useState(null);//for the message input
    const [err,setErr] = useState(false);
    if(currentUser.photoURL === GenericPhotoUrl){
      console.log("THEY ARE THE SAME");
    }






  const handleSubmit = async(e) =>{
    
    
    
    if (img === null) {
      setErr(true);
    } else {
      if (setErr) {
        setErr(false);
      }
      
    //const fileRef = ref(storage, "genericUser/user-square-svgrepo-com.svg");
    setLoading(true);
    if (currentUser.photoURL !== GenericPhotoUrl) {
      const oldImageRef = ref(storage, currentUser.photoURL);
      
      // Check if the old image exists before trying to delete it
      const objectExists = await getMetadata(oldImageRef)
        .then(() => true)
        .catch(() => false);
      
      if (objectExists) {
        // Delete the old image
        await deleteObject(oldImageRef);
        console.log("old image deleted");
      } else {
        console.log("Object does not exist");
      }
    }
  
  const date = new Date().getTime();
  const storageRef = ref(storage, `${currentUser.displayName + date}`);
  
  //props.setIsLoading(true);
  
  
  await uploadBytesResumable(storageRef, img).then(() => {
    getDownloadURL(storageRef).then(async (downloadURL) => {
      
      try {
        updateProfile(currentUser, {
          
          photoURL: downloadURL, // Pass GenericPhotoUrl as argument^
        });
        
        
        await updateDoc(doc(db, "users", currentUser.uid), {
          photoURL: downloadURL,
        });
        console.log("Current user:", currentUser);
        console.log(downloadURL);
        // await setDoc(doc(db, "userChats", res.user.uid), {}
        
        
        // );

        
        window.location.reload();
        //props.setIsLoading(true);
      
      } catch (err) {
        console.log(err);
        setErr(true);
        //props.setIsLoading(false);
        //etLoading(false);
      }
    });
    
    setShowModal(false);
  });
      //setLoading(false);

    }


}


  return (
   
    <>
     <button 
    className="bg-emerald-600 text-white font-bold uppercase px-6 py-3 rounded-lg shadow-md hover:bg-emerald-700 focus:outline-none"
    type="button"
    onClick={() => setShowModal(true)}
>
        update Profile Picture
      </button>
      {showModal ? (
        
        <>

          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-sm">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Modal Title
                  </h3>
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
                {err &&(
                           <div>
                           <div class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
                             <p class="font-bold">Be Warned</p>
                             <p>please select a picture to upload</p>
                           </div>
                         </div>

                        )
                        }
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    I always felt like I could do anything. That’s the main
                    thing people are controlled by! Thoughts- their perception
                    of themselves! They're slowed down by their perception of
                    themselves. If you're taught you can’t do anything, you
                    won’t do anything. I was taught I could do everything.
                  </p>
                  <input required className='hidden'  type="file" id="file" onChange={(e)=>{setImg(e.target.files[0])} }/>
                        <label className='flex place-items-center gap-2 py-4' htmlFor='file'>
                        <MyComponent />
                      
                            
                        
                            <span >Choose profile photo</span>
                        </label>
                </div>
                {/*footer*/}

                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => { setErr(false); setShowModal(false); }}
                    >
                    Close
                  </button>



                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                    onClick={handleSubmit}

                  >
                    
                  
                    Save Changes

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
}

{/* <input required className='hidden'  type="file" id="file" />
<label className='flex place-items-center gap-2 py-4' htmlFor='file'>
<MyComponent />
    
   
    <span >Choose profile photo</span>
</label>

<button
type="submit"
className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded '
>
edit profile picture
</button> */}