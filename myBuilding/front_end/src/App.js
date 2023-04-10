import {React,useState,useEffect,useRef} from 'react';
import { Routes, Route, useLocation,useNavigate , Navigate,BrowserRouter as Router } from 'react-router-dom';
import  {Home, About, Listings,Messages,SingleListing, Profile, SendNotifications, Documents} from './components'
import NavBar from './components/layout/NavBar'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Login } from './components/common/Login';
import { Register } from './components/common/Register';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import MyListings from './components/LandLord/MyListings';
import ListingDetails from './components/layout/ListingDetails';
import LandLordListingDetails from './components/LandLord/LandLordListingDetails';



//const authentication = getAuth();





const App = () => {

  const { currentUser, accountType,setLoading} = useContext(AuthContext);
 

    const LandLordRoute = ({ children, pn}) => {
 
     console.log(pn);
     const nav = useNavigate();
      if(accountType === "LandLord"){ 
        nav(pn);   
      }else{
        window.history.back();
      }
      return children
     
    };


    const ProtectedRoute = ({ children }) => {
      currentUser ? <Navigate to="/profile" />:<Navigate to="/login" />
      return children
  
    };

 


  return (
    <div class='App'>

      
    <>


    <Router>
     <ToastContainer/>
        <NavBar   />
          <Routes>
            <Route path = "/">
              <Route 
              index 
              element = {<Home/>}/>
              <Route path="login" element = {<Login/>}/>
              <Route path="register" element = {<Register/>}/>
              <Route path = 'about' element={<About />}/>
              <Route path="messaging" element={<ProtectedRoute> <Messages/> </ProtectedRoute>} />
              <Route path="listings" element={<ProtectedRoute> <Listings/> </ProtectedRoute>} />
              <Route path="listings/:id" element={<ProtectedRoute> <ListingDetails /> </ProtectedRoute>} />
              <Route path="profile" element={<ProtectedRoute> <Profile/> </ProtectedRoute>} />
              <Route path="documents" element={<ProtectedRoute> <Documents/> </ProtectedRoute>} />
              <Route path="mylistings/" element={<ProtectedRoute> <MyListings/> </ProtectedRoute>} />
              <Route path="mylistings/:id" element={<ProtectedRoute> <LandLordListingDetails/> </ProtectedRoute>} />



              <Route path="sendNotifications" element={<ProtectedRoute> <LandLordRoute pn = "sendNotifications" > <SendNotifications/> </LandLordRoute> </ProtectedRoute>} />
             

            </Route>



           

          </Routes>


            
            
                
           
      </Router>
    
    </>

    </div>
      
       
       
              
        
    
  )
}

export default App