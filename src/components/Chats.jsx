import React, { useContext, useState, useEffect } from 'react'
import { doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { BsImageFill } from 'react-icons/bs'
import {AiOutlineCheckCircle} from 'react-icons/ai'
import { db } from '../firebase';

export default function Chats() {
    const [chats, setChats] = useState([]);

    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);
    const { data } = useContext(ChatContext);

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

    const handleSelect = (u) => {
        dispatch({ type: "CHANGE_USER", payload: u });
    };

    return (
        <div className='chats'>
            {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => (
                <div
                    className="userChat"
                    key={chat[0]}
                    onClick={() => handleSelect(chat[1].userInfo)}
                >
                    <div className='userChatInfo'>
                        <img src={chat[1].userInfo.photoURL} alt="" />
                        <div className="userChatLM">
                            <span>{chat[1].userInfo.displayName}</span>
                            {(chat[1].lastMessage?.text !== "") ? <p>{chat[1].lastMessage?.text}</p> : <p><BsImageFill size={20} />IMG</p>}
                        </div>
                    </div>
                    {data.user?.displayName === chat[1].userInfo.displayName && <AiOutlineCheckCircle size={25} className="userChating"/>}
                </div>
            )
            )}
        </div>
    )
}
