import {React,useState,useEffect} from 'react';
import { Routes, Route, useNavigate,Navigate,BrowserRouter as Router } from 'react-router-dom';
import  {Home, About, Listings,Messages,SingleListing, Profile, Documents} from './components'
import NavBar from './components/layout/NavBar'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Login } from './components/common/Login';
import { Register } from './components/common/Register';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';




//const authentication = getAuth();





const App = () => {
  const { currentUser } = useContext(AuthContext);

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
              <Route path="singleListing" element={<ProtectedRoute> <SingleListing/> </ProtectedRoute>} />
              <Route path="profile" element={<ProtectedRoute> <Profile/> </ProtectedRoute>} />
              <Route path="documents" element={<ProtectedRoute> <Documents/> </ProtectedRoute>} />
            </Route>



           

          </Routes>


            
            
                
           
      </Router>
    
    </>

    </div>
      
       
       
              
        
    
  )
}

export default App