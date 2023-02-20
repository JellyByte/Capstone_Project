import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";


export const auth = firebase.initializeApp({
  apiKey: "AIzaSyAEiZ6bMvpWXmRKFxwnVqh6jy82CBt2Rwc",
  authDomain: "chat-application-a69e4.firebaseapp.com",
  projectId: "chat-application-a69e4",
  storageBucket: "chat-application-a69e4.appspot.com",
  messagingSenderId: "660867795637",
  appId: "1:660867795637:web:79cdbf3bfad6eee9414cfc"

  }).auth();
export const storage = getStorage();
export const db = getFirestore();
