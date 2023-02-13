import React from "react";
import Search from "./Search";
import Sidebar from "./Sidebar";
const MessageNavbar = () => {

    return (
        <div className = "messageNavbar"> 
        <span className="logo">myBuilding</span>
        <div className="user">
            <img src="https://pngimg.com/d/mario_PNG125.png" alt="" />
            <span>User1</span>
            <button>GroupChat+</button>
        </div>
        </div>
    )
}
export default MessageNavbar