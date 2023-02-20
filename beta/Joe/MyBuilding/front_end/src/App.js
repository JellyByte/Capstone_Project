import React from 'react';
import { Routes, Route, useNavigate, BrowserRouter as Router} from 'react-router-dom';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { About } from './pages/About';
import Messages from './pages/Messages';
import { SingleListing } from './pages/SingleListing';
import { Listings } from './pages/Listings';
import { NavBar } from './pages/NavBar';
import { Documents } from './pages/Documents';
import { Upload } from './pages/Upload';
import "./style.scss";
import { AddAppartment } from './pages/AddAppartments';


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
          <Route path = '/documents' element={<Documents />}/>
          <Route path = '/upload' element={<Upload />}/>
          <Route path = '/addAppartments' element={<AddAppartment />}/>
        </Routes>
      
      
    </>   
  )
}





export default App