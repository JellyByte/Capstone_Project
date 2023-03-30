import React,{forwardRef} from "react";
import {MyComponent} from "../svgs/addIcon";
import { useState,useEffect,useImperativeHandle} from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {ref,uploadBytesResumable,getDownloadURL, deleteObject} from "firebase/storage"
import {db,storage} from "../../firebase-config"
import { v4 as uuid } from "uuid";
import { doc,  updateDoc, setDoc  } from 'firebase/firestore';
import { updateProfile } from "firebase/auth";
import { getMetadata } from "firebase/storage";




export  const UploadForm =() => {

  const {currentUser,} = useContext(AuthContext);
    const [title, setTitle] = useState("");
    const [descrip, setDescrip] = useState("");
    const [img, setImg] = useState(null);
    const [err, setErr] = useState(false);
    const [showModal, setShowModal] = React.useState(false);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("WE ARE IN THE FORM")
  
      // Get values from the form
      const titleValue = e.target[0].value;
      const descripValue = e.target[1].value;
      const imgValue = e.target[2].files[0];

      //callback(titleValue, descripValue, imgValue);
  
      setTitle(titleValue);
      setDescrip(descripValue);
      setImg(imgValue);
  
      console.log(titleValue);
      console.log(descripValue);
      console.log(imgValue)

      try {
        // Upload image to Firebase Storage
       // const storage = getStorage();
       const date = new Date().getTime();
       const uid = uuid();
        const storageRef = ref(storage, `${titleValue +date}`);
        await uploadBytesResumable(storageRef, imgValue).then(()=>{

          getDownloadURL(storageRef).then(async (downloadURL)=>{
                const docRef = doc(db, "Listings", currentUser.uid+date);
                await setDoc(docRef, {
                  title: titleValue,
                  description: descripValue,
                  photoURL: downloadURL,
                  uId: uid, // include the current user's ID in the document
                });

          

            })
          })
        
      }catch(e){
        //crossOriginIsolated.log(e);
        setErr(e);


      }
  
  
    };

    // useImperativeHandle(ref, () => ({
    //   handleSubmit: handleSubmit,
    // }));
  
    return (
      <div>
        {err && <p>Error uploading form data</p>}
        <form onSubmit={ handleSubmit}>
          <input type="text" placeholder="title" />
          <input type="text" placeholder="description" />
          <input type="file" placeholder="image" />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }