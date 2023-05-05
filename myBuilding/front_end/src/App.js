import {React,useState,useEffect,useRef} from 'react';
import { Routes, Route, useLocation,useNavigate , Navigate,BrowserRouter as Router } from 'react-router-dom';
import  {Home, About, Listings,Messages,SingleListing, Profile, SendNotifications, Documents, About_teams, About_others} from './components'
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
 

  const LandLordRoute = ({ children, pn }) => {
    const navigate = useNavigate();
  
    useEffect(() => {
      if (accountType === "LandLord") {
        navigate(pn);
      } else {
        window.history.back();
      }
    }, [accountType, navigate, pn]);
  
    return children;
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
              <Route path="mylistings/" element={ <LandLordRoute> <MyListings/> </LandLordRoute> } />
              <Route path="mylistings/:id" element={<LandLordRoute>  <LandLordListingDetails/>  </LandLordRoute>} />
              <Route path = 'about_others/' element={<About_others />}/>
              
              



             

            </Route>



           

          </Routes>


            
            
                
           
      </Router>
    
    </>

    </div>
      
       
       
              
        
    
  )
}

export default App