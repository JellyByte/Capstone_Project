import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAEiZ6bMvpWXmRKFxwnVqh6jy82CBt2Rwc",
  authDomain: "chat-application-a69e4.firebaseapp.com",
  projectId: "chat-application-a69e4",
  storageBucket: "chat-application-a69e4.appspot.com",
  messagingSenderId: "660867795637",
  appId: "1:660867795637:web:79cdbf3bfad6eee9414cfc"

  
}
  export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
