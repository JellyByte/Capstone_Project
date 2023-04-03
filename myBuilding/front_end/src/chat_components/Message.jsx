import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

export const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const whichUser =
    message.senderId === currentUser.uid ? currentUser : data.user;
  const isOwner = message.senderId === currentUser.uid ? true : false;

  const ref = useRef();

  const date = message.date.toDate();
  const timeString = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  console.log(timeString);
  useEffect(() => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`font-mono flex gap-5 p-2 ${
        isOwner ? "flex-row-reverse" : ""
      }`}
    >
      <div
        className={`flex flex-col text-cyan-700 mb-5 ${
          isOwner ? "" : "justify-start"
        }`}
      >
        <img
          className="w-12 h-12 rounded-full object-cover"
          src={whichUser.photoURL}
          alt=""
        ></img>
        <span className="text-sm font-normal">{timeString}</span>
      </div>
      <div
        className={`max-w-4/5 flex flex-col gap-2.5 ${
          isOwner ? "items-end" : "items-start"
        }`}
      >
        <p
          className={` p-2.5 rounded-xl max-w-max ${
            isOwner
              ? "rounded-tr-none bg-gradient-to-l from-cyan-700/80 to-cyan-600/80   "
              : "rounded-tl-none bg-gradient-to-r from-slate-300 to-slate-200 "
          } shadow-md`}
        >
          {" "}
          {message.text}
        </p>
        {message.img && (
          <img
            className="w-48 h-60 rounded-sm object-cover "
            src={message.img}
            alt=""
          ></img>
        )}
      </div>
    </div>
  );
};
