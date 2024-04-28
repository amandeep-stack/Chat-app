import React, { useState } from 'react'
import Picker from 'emoji-picker-react'
import { IoMdSend } from 'react-icons/io'
import { BsEmojiSmileFill } from 'react-icons/bs'

export const ChatInput = ({ handleSendMessage }) => {

    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const [msg, setMsg] = useState('')

    const handleEmojiPickerHideShow = () => {
        setShowEmojiPicker(!showEmojiPicker)
    }

    const handleEmojiClick = (emoji) => {
        console.log(emoji.emoji);
        let message = msg;
        message += emoji.emoji;
        setMsg(message)
    }

    const sendChat = (event) => {
        event.preventDefault();
        if (msg.length > 0) {
            handleSendMessage(msg);
            setMsg('');
        }
    }

    return (
        <div className='container flex items-center h-[52px] bg-[rgb(34,46,53)] justify-between px-6'>
            <div className='btn-container h-[100%] flex items-center'>
                <div className="emoji text-2xl border-none h-[100%]px-3 py-2 rounded-l-xl text-gray-400 cursor-pointer">
                    <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
                </div>
                {
                    showEmojiPicker &&
                    <div className='absolute bottom-[50px]' >
                        <Picker onEmojiClick={handleEmojiClick} />
                    </div>
                }
            </div>
            <form className='w-[100%] flex justify-between ml-16' onSubmit={sendChat}>
                <input className=' w-[90%] bg-gray-600 border-none outline-none text-white px-6 py-1 rounded-lg' type="text" placeholder='type a message' value={msg} onChange={(e) => setMsg(e.target.value)} />
                <button className='text-gray-400 text-2xl'>
                    <IoMdSend />
                </button>
            </form>
        </div >
    )
}
