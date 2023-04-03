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
import { doc, getDocs, updateDoc, onSnapshot } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { getMetadata } from "firebase/storage";
import { ChatContext } from "../../context/ChatContext";
import { collection, query, where, getDoc } from "firebase/firestore";

//import { LoadingContext } from "../../context/LoadingContext";

export default function Modal(props) {
  const { currentUser, GenericPhotoUrl, setLoading } = useContext(AuthContext);

  const getUsers = async (pUrl) => {
    const userChatsRef = collection(db, "userChats");
    const currentUserDoc = doc(userChatsRef, currentUser.uid);
    const membersCol = collection(currentUserDoc, "Members");
    //getting all the people the currect user is chatting with from Members

    const querySnapshot = await getDocs(membersCol);
    const membersData = querySnapshot.docs.map((doc) => doc.data());
    console.log(membersData.length);
    // adding all of the docs into the members map

    for (let i = 0; i < membersData.length; i++) {
      const member = membersData[i].info;
      //console.log(member[0]);
      let uid = member[0].toString();
      const thispUrl = member[1];
      let name = member[2].toString();
      console.log(uid);
      let combinedId =
        currentUser.uid > uid ? currentUser.uid + uid : uid + currentUser.uid;

      //deriving the combined id for every user the current user is chatting with

      console.log(name);

      const docRef = doc(db, "userChats", uid);
      // accessing the chat that the current user is having with the user they are changing the photoURL for
      const docSnap = await getDoc(docRef);
      // const docRef2 = doc(db, "userChats", currentUser.uid);
      // const docSnap2 = await getDoc(docRef2);
      console.log("here");

      if (docSnap.exists()) {
        console.log(
          "name of: " + name,
          docSnap.data()[combinedId].userInfo.displayName
        );

        await updateDoc(docRef, {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: pUrl,
          },

          //[combinedId + ".date"]: serverTimestamp(),
        });
        // await updateDoc(docRef2, {
        //   [combinedId + ".userInfo"]: {
        //     uid: uid,
        //     displayName: name,
        //     photoURL: thispUrl,
        //   },

        //   //[combinedId + ".date"]: serverTimestamp(),
        // });
      } else {
        console.log("No such document!");
      }
    }
  };

  // const dataArray = [];
  // const getUsers = async () => {
  //   const user_chats_ref = collection(db, "userChats");
  //   const currentUserDoc = doc(user_chats_ref, currentUser.uid);
  //   const mems = collection(currentUserDoc, "Members");
  //   //const mems = user_chats_ref.doc(currentUser.uid).collection("Members");
  //   getDocs(mems).then((querySnapshot) => {
  //     querySnapshot.forEach((doc) => {
  //       dataArray.push(doc.data());
  //       //setUsers(doc.data());
  //     });
  //     // console.log(users);

  //     showU();
  //   });
  // };
  //const showU = async () => {

  // console.log(Object.entries(dataArray)[0][1]);
  // for (let i = 0; i < dataArray.length; i++) {
  //   let uid = Object.entries(dataArray)[i][1].info[0];
  //   //let photoUrl = Object.entries(dataArray)[i][1].info[1];
  //   let name = Object.entries(dataArray)[i][1].info[2];
  //   //dataArray = [];
  //   //console.log(uid);
  //   // console.log(photoUrl);
  //   console.log(name);
  //   console.log(uid);
  //   //const name = Object.entries(dataArray)[0][1].info[2];
  //   const combinedId =
  //     currentUser.uid > uid ? currentUser.uid + uid : uid + currentUser.uid;
  //   //console.log(combinedId);
  //   const docRef = doc(db, "userChats", uid);
  //   const docSnap = await getDoc(docRef);
  //   if (docSnap.exists()) {
  //     // console.log("Document data:", docSnap.data()[combinedId]);
  //     console.log("Document data:", docSnap.data()[combinedId]);
  //   } else {
  //     doc.data(); // will be undefined in this case
  //     console.log("No such document!");
  //   }
  //   //this works jus fine
  //   await updateDoc(doc(db, "userChats", uid), {
  //     [combinedId + ".userInfo"]: {
  //       uid: uid,
  //       displayName: name,
  //       photoURL:
  //         "https://firebasestorage.googleapis.com/v0/b/chat-application-a69e4.appspot.com/o/sam1677210971290?alt=media&token=e8614e2f-bce5-4ac8-8012-22682fea6bad",
  //     },

  //     //[combinedId + ".date"]: serverTimestamp(),
  //   });
  //dataArray = [];
  // }

  //  const combinedId = currentUser.uid > user.uid
  //  ? currentUser.uid+user.uid
  //  :user.uid+currentUser.uid;
  const [showModal, setShowModal] = React.useState(false);
  const [img, setImg] = useState(null); //for the message input
  const [err, setErr] = useState(false);
  //const { data } = useContext(ChatContext);

  //console.log(data);

  if (currentUser.photoURL === GenericPhotoUrl) {
    console.log("THEY ARE THE SAME");
  }

  const handleSubmit = async (e) => {
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

            //console.log("Current user:", currentUser);
            // console.log(downloadURL);
            // await setDoc(doc(db, "userChats", res.user.uid), {}
            await getUsers(downloadURL);

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
  };

  return (
    <>
      <button
        className="bg-emerald-600 text-white font-bold uppercase px-6 py-3 rounded-lg shadow-md hover:bg-emerald-700 focus:outline-none"
        type="button"
        onClick={getUsers}
      >
        get users
      </button>
      <button
        className="bg-emerald-600 text-white font-bold uppercase px-6 py-3 rounded-lg shadow-md hover:bg-emerald-700 focus:outline-none"
        type="button"
        onClick={() => setShowModal(true)}
      >
        update Profile Picture
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

{
  /* <input required className='hidden'  type="file" id="file" />
<label className='flex place-items-center gap-2 py-4' htmlFor='file'>
<MyComponent />
    
   
    <span >Choose profile photo</span>
</label>

<button
type="submit"
className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded '
>
edit profile picture
</button> */
}
