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




export default function UploadForm() {

    const handleSubmit = async (e)=>{
        e.preventDefault();
  
        // Get values from the form
        const title = (e.target[0].value);
        const descrip = (e.target[1].value);
        const img = (e.target[2].files[0]);
       
    }


    return (
        <div>
            <form>
                <label>
                    Title:
                    <input type="text" />
                </label>
                <label> Description
                    <input type="text" />
                </label>
                <label>
                    Upload Image
                    <input type="file"/>
                </label>
                <button type="submit">Submit</button>

            </form>
        </div>
    )
}