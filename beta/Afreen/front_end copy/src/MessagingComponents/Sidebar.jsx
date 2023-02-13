import React from "react";
import Chats from "./Chats";
import MessageNavbar from "./MessageNavbar";
import Search from "./Search";

const Sidebar = () => {

    return (
        <div className="sidebar">
        <MessageNavbar/>
        <Search/>
        <Chats/>
        </div>
    )
}

export default Sidebar