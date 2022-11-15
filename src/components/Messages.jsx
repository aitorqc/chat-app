import React, { useContext, useEffect, useState } from "react"
import { doc, onSnapshot } from "firebase/firestore"
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";

import Message from './Message'

export default function Messages() {
  const [messages, setMessages] = useState([]);

  let lastDate = "";

  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      if (doc.exists()) {
        setMessages(doc.data().messages);
        lastDate = (new Date(doc.data().messages[0].date.seconds * 1000).toLocaleString().split(",")[0]);
      }
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  return (
    <div className="messages">
      {messages?.map((m) => {
        if (new Date(m.date.seconds * 1000).toLocaleString().split(",")[0] > lastDate) {
          lastDate = (new Date(m.date.seconds * 1000).toLocaleString().split(",")[0]);
          return (
            <div key={m.id}>
              <div className="divider">{lastDate}</div>
              <Message message={m} />
            </div>
          )
        } else {
          return <Message key={m.id} message={m} />
        }
      }
      )}
    </div>
  )
}
