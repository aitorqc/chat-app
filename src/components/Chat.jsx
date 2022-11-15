import React, { useContext } from "react";
import { BsFillCameraVideoFill } from 'react-icons/bs'
import { FiUserPlus, FiMoreHorizontal } from 'react-icons/fi'

import { ChatContext } from "../context/ChatContext";

import Input from './Input'
import Messages from './Messages'

export default function Chat() {
    const { data } = useContext(ChatContext);

    return (
        <div className='chat'>
            <div className="chatInfo">
                <span>{data.user?.displayName}</span>
                <div className="chatIcons">
                    <BsFillCameraVideoFill size={25} />
                    <FiUserPlus size={25} />
                    <FiMoreHorizontal size={25} />
                </div>
            </div>
            <Messages />
            <Input />
        </div>
    )
}
