import { createContext, useEffect, useState } from "react";
import { auth,db } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { doc,getDoc, } from "firebase/firestore";
import { Loading } from "../components/Loading";
import { storage } from "../firebase-config";
import { ref,getDownloadURL } from "firebase/storage";



export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [accountType, setAccountType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [GenericPhotoUrl,setGenericPhotoUrl] = useState("");
  //setLoading(true);
 
  
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      
      setCurrentUser(user);
      if (user) {
        console.log(user.photoURL)
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const accountType = userDoc.data().account_type;
        setAccountType(accountType);
        console.log(accountType)
      } else {

        setAccountType(null);
      }
      const fileRef = ref(storage, "genericUser/user-square-svgrepo-com.svg");
      await getDownloadURL(fileRef)
          .then((url) => {
            setGenericPhotoUrl(url);})

          });
          
          setLoading(false);
          return () => {
            unsub();
          };
        }, []);
        
  
  // useEffect(() => {
    //   console.log(currentUser);
    // }, [currentUser]);

    
    return (
      <AuthContext.Provider value={{ currentUser,accountType, setAccountType, setLoading,GenericPhotoUrl}}>
       {loading ? (
        <Loading/> // Render loading indicator
      ) : (
        children // Render children when data is available
      )}
    </AuthContext.Provider>
  );
};

// useEffect(() => {
//   const unsub = onAuthStateChanged(auth, async (user) => {
//   setCurrentUser(user);
//   if (user) {
  
//       const userDoc = await getDoc(doc(db, "users", user.uid));
//       const accountType = userDoc.data().account_type;
//       //console.log("User object:", { ...user, accountType });
//       setCurrentUser({...user, accountType });
      
//       //user.getIdToken().then(function(idToken) {  // <------ Check this line
//         //console.log(idToken); // It shows the Firebase token now
     

    
//       // rest of your code here
//   }
// });

// if (user) {
//   const { displayName, email, uid, photoURL } = user;

//   // Fetch the user document from Firestore
//   const userDoc = await getDoc(doc(db, "users", uid));
//   const accountType = userDoc.data().account_type;

//   let idToken = null;
//   if (user.getIdToken) {
//     idToken = await userInternal.getIdToken();
//   }

//   // Add the "account_type" property to the user object
//   const userData = { uid,displayName,email,photoURL, account_type: accountType, token: idToken };
//   setCurrentUser(userData);
//   console.log(idToken);
//   console.log(currentUser);
// } else {
//   setCurrentUser(null);
// }







// export const AuthContext = createContext();

// export const AuthContextProvider = ({ children }) => {
  //   const [currentUser, setCurrentUser] = useState({});
  
  //   useEffect(() => {
    //     const unsub = onAuthStateChanged(auth, (user) => {
      //       if(user){
//       //setCurrentUser(user);
//       const { displayName, email, uid } = user;
//       // Get the user's AccountType from Firestore and update the currentUser object
//       getDoc(doc(db, "users", uid)).then((doc) => {
//         const userData = { uid, displayName, email, account_type: doc.data().account_type };
//         setCurrentUser(userData);
//         console.log(userData);
//       });
//     }else{
//       setCurrentUser(null);
//     }


//       //console.log(user);
//     });

//     return () => {
//       unsub();
//     };
//   }, []);

//   return (
//     <AuthContext.Provider value={{ currentUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };