import React from "react";

import { MyComponent } from "../svgs/addIcon";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "../../firebase-config";
import { v4 as uuid } from "uuid";
import { doc, updateDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { getMetadata } from "firebase/storage";
import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { auth, db, storage } from "../../firebase-config";
import { AuthContext } from "../../context/AuthContext";

export default function AddTenantModal(props) {
  const [showModal, setShowModal] = React.useState(false);
  const [tenant, setTenant] = useState(null); 
  const [err, setErr] = useState(false);

  const { currentUser, accountType } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [mounted, setMounted] = useState(false);

  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    const db = firebase.firestore();
    const querySnapshot = await db
      .collection('users')
      .where('accountType', '==', 'tenant')
      .where('username', '>=', searchTerm)
      .where('username', '<=', searchTerm + '\uf8ff')
      .get();
    const results = querySnapshot.docs.map((doc) => doc.data());
    setSearchResults(results);
  };


  const handleSubmit = () => {};

  return (
    <>
      <button
        className="bg-emerald-600 text-white font-bold uppercase px-6 py-3 rounded-lg shadow-md hover:bg-emerald-700 focus:outline-none"
        type="button"
        onClick={() => setShowModal(true)}
      >
        add a tenant
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-sm">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Modal Title</h3>
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
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    I always felt like I could do anything. That’s the main
                    thing people are controlled by! Thoughts- their perception
                    of themselves! They're slowed down by their perception of
                    themselves. If you're taught you can’t do anything, you
                    won’t do anything. I was taught I could do everything.
                  </p>
                  <input
                    required
                    className="hidden"
                    type="file"
                    id="file"
                    onChange={(e) => {
                      setImg(e.target.files[0]);
                    }}
                  />
                  <label
                    className="flex place-items-center gap-2 py-4"
                    htmlFor="file"
                  >
                    <MyComponent />

                    <span>Choose profile photo</span>
                  </label>
                </div>
                {/*footer*/}

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

                  <input
                  type="text"
                  placeholder="Search by username"
                   value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}/>
                          <button onClick={handleSearch}>Search</button>
                          <ul>
  {searchResults.map((result) => (
    <li key={result.uid}>{result.username}</li>
  ))}
</ul>
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
