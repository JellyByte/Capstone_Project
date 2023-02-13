import React from "react";
import Input from "./Input";
import Sidebar from "./Sidebar";
import Texts from "./Texts";
const Chat = () => {

    return (
        <div className="chat">
        <div className="chatInfo"> 
        <span>User1</span>
        <div className="chatIcons">
        </div>
        
        </div>
        <Texts/>
        <Input/>
        </div>
    )
}
export default Chat