import React, { useContext, useEffect, useRef, useState } from "react"

import { AuthContext } from "../context/AuthContext"
import { ChatContext } from "../context/ChatContext"

export default function Message({ message }) {
  const [msgDate, setMsgDate] = useState();

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    setMsgDate(new Date(message.date.seconds * 1000).toLocaleString().split(",")[1]);
  }, [message]);

  return (
    <>
      <div ref={ref} className={`message ${message.senderId === currentUser.uid && "owner"}`}>
        <div className="messageInfo">
          <img src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          } alt="" />
          <span>{msgDate}</span>
        </div>
        <div className="messageContent">
          {message.text && <p>{message.text}</p>}
          {message.img && <img src={message.img} alt="" />}
        </div>
      </div>
    </>
  )
}
