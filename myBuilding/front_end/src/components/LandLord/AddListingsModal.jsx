import React, { useRef } from "react";
import { useState } from "react";

import { v4 as uuid } from "uuid";
import { MyComponent } from "../svgs/addIcon";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "../../firebase-config";
import {
  doc,
  getDocs,
  updateDoc,
  onSnapshot,
  arrayUnion,
} from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { getMetadata } from "firebase/storage";
import { ChatContext } from "../../context/ChatContext";
import { collection, query, where, getDoc, setDoc } from "firebase/firestore";

export const AddListingsModal = () => {
  const childRef = useRef(null);
  const { currentUser } = useContext(AuthContext);

  const [showModal, setShowModal] = React.useState(false);
  const [img, setImg] = useState(null); //for the message input
  const [err, setErr] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [downloadURL, setDownloadURL] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const titleValue = e.target[0].value;
    const address = e.target[1].value;
    const city = e.target[2].value;
    const state = e.target[3].value;
    const zip = e.target[4].value;
    const description = e.target[5].value;

    //const descripValue = e.target[2].value;

    //const imgValue = e.target.files[0];
    //setImg(imgValue);
    console.log(titleValue);
    console.log(address);
    console.log(state);
    console.log(zip);
    console.log(description);
    console.log(selectedFile);

    try {
      // Upload image to Firebase Storage
      // const storage = getStorage();
      const date = new Date().getTime();
      const listingid = uuid();
      const combinedId =
        currentUser.uid > listingid
          ? currentUser.uid + listingid
          : listingid + currentUser.uid;

      const storageRef = ref(storage, `Listings/${titleValue + date}`);
      await uploadBytesResumable(storageRef, selectedFile).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          setDownloadURL(downloadURL);
          const docRef = collection(db, "Listings");
          const listingsRef = doc(docRef, currentUser.uid);
          // const currentUserListingRef = doc(d, listingsRef, currentUser.uid);
          // const membersRef = collection(currentUserListingRef, "Members");
          // const newDocRef = doc(membersRef, currentUser.uid);
          await updateDoc(listingsRef, {
            listings: arrayUnion({
              uid: listingid,
              titleValue: titleValue,
              adress: address,
              city: city,
              state: state,
              description: description,
              downLoadURL: downloadURL,
              zip: zip,
            }),
          });
          const generalListingsRef = collection(db, "generalListings");
          const generalListingsDoc = doc(generalListingsRef, listingid);
          await setDoc(generalListingsDoc, {
            address: address,
            city: city,
            description: description,
            id: listingid,
            photoURL: downloadURL,
            postedBy: currentUser.displayName,
            state: state,
            titleValue: titleValue,
            zip: zip,
          });

          // await updateDoc(docRef, {
          //   [combinedId + ".listingInfo"]: {
          //     title: titleValue,
          //     address: address,
          //     state: state,
          //     zip: zip,
          //     description: description,
          //     photoURL: downloadURL,
          //     uId: listingid, // include the current user's ID in the document
          //   },
          // });
        });
      });
    } catch (e) {
      //crossOriginIsolated.log(e);
      setErr(e);
    }
  };
  const handleFileSelect = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  return (
    <>
      <button
        className="bg-emerald-600 text-white font-bold uppercase px-6 py-3 rounded-lg shadow-md hover:bg-emerald-700 focus:outline-none"
        type="button"
        onClick={() => setShowModal(true)}
      >
        add a Listing
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
                  <p className=" text-slate-500 text-lg leading-relaxed flex justify-center">
                    upload listing
                  </p>
                  {/* <UploadForm ref = {childRef}/> */}
                  <div>{err && <p>Error uploading form data</p>}</div>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="px-2 flex flex-col gap-2">
                    <input
                      className="px-4 py-2 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="text"
                      placeholder="Title"
                    />
                    <input
                      className="px-4 py-2 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="text"
                      placeholder="Address"
                    />
                    <input
                      className="px-4 py-2 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="text"
                      placeholder="City"
                    />
                    <input
                      className="px-4 py-2 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="text"
                      placeholder="State"
                    />
                    <input
                      className="px-4 py-2 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="text"
                      placeholder="zipcode"
                    />
                    <input
                      className="px-4 py-2 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="text"
                      placeholder="Description"
                    />
                    <div className="flex flex-col gap-4">
                      <label
                        htmlFor="fileInput"
                        className="block font-medium text-gray-700"
                      >
                        Choose a file:
                      </label>

                      <div className="flex flex-col gap-2">
                        <button
                          className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() =>
                            document.getElementById("fileInput").click()
                          }
                        >
                          Select file
                        </button>

                        {selectedFile && (
                          <div className="flex flex-row items-center gap-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6 text-green-600"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            <span className="text-green-600">
                              {selectedFile.name}
                            </span>
                          </div>
                        )}

                        <input
                          id="fileInput"
                          type="file"
                          className="hidden"
                          onChange={handleFileSelect}
                        />
                      </div>
                    </div>
                  </div>
                  {/* <button type="submit">Submit</button> */}
                  {/*footer*/}`{" "}
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
                      //onClick={handleSubmit}
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};
