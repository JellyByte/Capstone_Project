import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase-config";

export const Chats = () => {
  const [chats, setChats] = useState([]);
  const { currentUser, setLoading } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  //setLoading(true);
  //console.log(currentUser.photoURL)
  //console.log(currentUser)
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);
  //setLoading(false);

  console.log(Object.entries(chats));

  const handleSelect = (user) => {
    dispatch({ type: "CHANGE_USER", payload: user });
  };

  return (
    <div className="h-screen">
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div
            className="p-2 flex justify-start gap-3 cursor-pointer mono  hover:bg-gray-600"
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
          >
            {/*userchat */}
            <img
              className="w-14 h-14 rounded-md object-cover"
              src={chat[1].userInfo.photoURL}
            ></img>
            <div className="userChatInfor">
              {/*userchat info */}
              <span className=" text-base  capitalize">
                {chat[1].userInfo.displayName}
              </span>
              <p className="text-sm italic text-gray-300 lowercase">
                {chat[1].lastMessage?.text}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};
