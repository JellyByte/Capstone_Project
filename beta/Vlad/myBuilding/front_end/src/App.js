import {React,useState} from 'react';
import { Routes, Route, useNavigate, } from 'react-router-dom';
import  {Home, About, Listings,Messages,SingleListing, Profile} from './components'
import NavBar from './components/layout/NavBar'

import{auth} from './firebase-config'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useAuthState} from 'react-firebase-hooks/auth'
import { Login } from './components/common/Login';
import { Register } from './components/common/Register';


//const authentication = getAuth();








const App = () => {



  const[user] = useAuthState(auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();



  // const handleAction = (id)=>{
  //  // const authentication = getAuth();
  //   if(id === 1){
  //      signInWithEmailAndPassword(auth, email, password)
  //     .then(() => {
  //       // Signed in 
  //       navigate('/profile')
       
  //        // ...
  //       }).catch((error) => {
  //       console.log(error.code)
  //       if (error.code === 'auth/wrong-password') {
  //         toast.error('Please check the Password');
  //       }
  //       if (error.code === 'auth/user-not-found') {
  //         toast.error('Please check the Email');
  //       }
  //     })

  //   }
  //   if(id === 2){
  //     createUserWithEmailAndPassword(auth, email, password)
  //     .then(()=>{
  //       navigate('/profile')
  //       //sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)

  //     })
  //     .catch((error) => {
  //       if (error.code === 'auth/email-already-in-use') {
  //         toast.error('Email Already in Use');
  //       }
  //     })
  //     if(id ===3){
  //       console.log('GOOGLE')
  //     }
      
  //   }



  //}
  return (
    <div className='App'>
      
    <>
    <ToastContainer/>
      <NavBar user={user} />
         <Routes>
         <Route path = "/">
            <Route 
            index 
            element = {<Home/>}/>
            <Route path="login" element = {<Login/>}/>
            <Route path="register" element = {<Register/>}/>



            
            
            
          </Route>

            <Route path = '/about' element={<About />}/>
            <Route path = '/messaging' element={< Messages/>}/>
            <Route path = '/listings' element={<Listings />}/>
            <Route path = '/singlelisting' element={<SingleListing />}/>
            <Route path = '/profile' element={<Profile />}/>

        </Routes>
    
    </>

    </div>
      
       
       
              
        
    
  )
}

export default App