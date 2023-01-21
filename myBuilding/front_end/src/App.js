import React from 'react';
import { Routes, Route, useNavigate, BrowserRouter as Router} from 'react-router-dom';
import { Login } from './components/Login';
import { Home } from './components/Home';
import { About } from './components/About';
import Messages from './components/Messages';
import { SingleListing } from './components/SingleListing';
import { Listings } from './components/Listings';
import { NavBar } from './components/NavBar';


const App = () => {
  return (
    <>
      <NavBar/>
         <Routes>
            <Route path = '/' element={<Home/>} exact/>
            <Route path = '/login' element={<Login />}/>
            <Route path = '/about' element={<About />}/>
            <Route path = '/messaging' element={< Messages/>}/>
            <Route path = '/listings' element={<Listings />}/>
            <Route path = '/singlelisting' element={<SingleListing />}/>
        </Routes>
    
    </>
      
       
       
        
    
  )
}

export default App