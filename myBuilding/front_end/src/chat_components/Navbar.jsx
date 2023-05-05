import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="flex items-center justify-between bg-teal-800 h-16 p-2 text-white">
      <span className="font-mono">Direct Message</span>
      <div className="flex items-center gap-3">
        <div className="flex flex-col">
          <img
            className="bg-black h-8 w-8 rounded-sm overflow-hidden object-cover"
            src={currentUser.photoURL}
            alt=""
          />
          <span className="font-mono text-sm">{currentUser.displayName}</span>
        </div>
      </div>
    </div>
  );
};
