import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signOut, updateCurrentUser } from "firebase/auth";
import { auth } from "../../firebase-config";
import { useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FaBars } from "react-icons/fa";

const SignedLinks = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { accountType } = useContext(AuthContext);

  console.log(accountType);

  const handleToggle = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div>
      <div className="hidden md:block">
        <NavLink
          to="/listings"
          className=" text-emerald-300 text-base font-medium mr-4 hover:text-fuchsia-200 bg"
        >
          {" "}
          Listings
        </NavLink>
        <NavLink
          to="/messaging"
          className="text-emerald-300 text-base font-medium mr-4 hover:text-fuchsia-200"
        >
          Messages
        </NavLink>
        <NavLink
          to="/documents"
          className="text-emerald-300 text-base font-medium mr-4 hover:text-fuchsia-200"
        >
          Documents
        </NavLink>
        {accountType === "LandLord" && 
          <NavLink
          to="/mylistings"
          className="text-emerald-300 text-base font-medium mr-4 hover:text-fuchsia-200"
          >
            My Listings
          </NavLink>
        
        }
        
          
        <NavLink
          to="/profile"
          className="text-emerald-300 text-base font-medium mr-4 hover:text-fuchsia-200"
        >
          profile
        </NavLink>
        <NavLink
          className="text-emerald-300 text-base font-medium mr-4 hover:text-fuchsia-200"
          onClick={() => {
            signOut(auth).then(() => {
              navigate("/");
            });
          }}
          >
          Logout
        </NavLink>
        
      </div>

      <button className="md:hidden" onClick={handleToggle}>
        <FaBars className="text-3xl text-emerald-300" />
      </button>
      <div className="relative" style={{ zIndex: 999 }}>
        {showMenu && (
          <div className="absolute right-0 mt-4 w-48 bg-white rounded-md shadow-lg opacity-90">
            <div className="py-1"
              onClick={handleToggle}
              >
              <NavLink
                to="/profile"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-emerald-300"
              >
                Profile
              </NavLink>
              <NavLink
                to="/documents"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-emerald-300"
              >
                Documents
              </NavLink>
              <NavLink
                to="/listings"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-emerald-300"
              >
                Listings
              </NavLink>
              {accountType === "LandLord" && 
                <NavLink
                to="/mylistings"
                className="text-emerald-300 text-base font-medium mr-4 hover:text-fuchsia-200"
                >
                  My Listings
                </NavLink>
              
              }
              <NavLink
                to="/messaging"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-emerald-300"
              >
                Messages
              </NavLink>
            </div>
            <div className="border-t border-gray-200 py-1">
              <NavLink
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-emerald-300"
                onClick={() => {
                  signOut(auth).then(() => {
                    navigate("/");
                  });
                }}
              >
                Log out
              </NavLink>
            </div>
          </div>
        )}
      </div>

      {/* <NavLink to="/profile" className='text-emerald-300 text-base font-medium mr-4 hover:text-fuchsia-200'> Profile 
 

       
        </NavLink> */}
      {/* <NavLink  className='text-emerald-300 text-base font-medium hover:text-fuchsia-200'> <button  onClick={()=>{signOut(auth).then(()=>{navigate('/')})}}> Log out</button></NavLink> */}
    </div>
  );
};

export default SignedLinks;
