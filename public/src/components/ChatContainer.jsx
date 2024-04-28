import React, { useEffect, useRef, useState } from 'react'
import { Logout } from './Logout'
import { ChatInput } from './ChatInput'
import axios from 'axios';
import { getAllMessagesRoutes, sendMessageRoute } from '../utils/API-routes';
import { v4 as uuidv4 } from 'uuid'

export const ChatContainer = ({ currentChat, currentUser, socket }) => {
    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const scrollref = useRef();

    useEffect(() => {
        if (currentChat) {
            const fetchedMessages = async () => {
                try {
                    const response = await axios.post(getAllMessagesRoutes, {
                        from: currentUser._id,
                        to: currentChat._id,
                    });
                    setMessages(response.data);
                } catch (error) {
                    console.error('Error fetching messages:', error);
                }
            };

            fetchedMessages();
        }
    }, [currentChat]);


    const handleSendMessage = async (msg) => {
        await axios.post(sendMessageRoute, {
            from: currentUser._id,
            to: currentChat._id,
            message: msg
        })

        socket.current.emit('send-msg', {
            to: currentChat._id,
            from: currentUser._id,
            message: msg
        })

        const msgs = [...messages]
        msgs.push({ fromSelf: true, message: msg })
        setMessages(msgs)
    }

    useEffect(() => {
        if (socket.current) {
            socket.current.on('msg-recieve', (msg) => {
                setArrivalMessage({ fromSelf: false, message: msg })
            })
        }
    }, [])

    useEffect(() => {
        arrivalMessage && setMessages((prev) => [...prev, arrivalMessage])
    }, [arrivalMessage])

    useEffect(() => {
        scrollref.current?.scrollIntoView({ behaviour: 'smooth' })
    }, [messages])

    return (
        <>
            {
                currentChat && (
                    <div className='container bg-purple-100 w-[100%] col-span-3'>
                        <div className='chat-header h-[60px] px-3 bg-[rgb(34,46,53)] text-white flex justify-between'>
                            <div className="user-details flex items-center gap-6">
                                <div className="avatar">
                                    <img className='h-[40px]' alt='avatar'
                                    />
                                </div>
                                <div className="username">
                                    <h3 className='text-xl'>{currentChat.username}
                                    </h3>
                                </div>
                            </div>
                            <Logout />
                        </div>
                        <div className='h-[80.7vh] backgroundImage '>
                            <div className='h-[99%] relative overflow-auto flex flex-col gap-14 px-20'>
                                <div className='flex justify-center mt-8'>
                                    <div className='bg-[rgb(24,34,41)] w-[560px] rounded-md py-2 text-yellow-500'>
                                        <h6 className='text-sm text-center'>Messages are end to end encrypted. No one outside of this chat, not even <br /> Whatsapp can read or listen to them. Click to learn more</h6>
                                    </div>
                                </div>
                                {messages.map((message) => {
                                    return (
                                        <div className=' text-white relative' ref={scrollref} key={uuidv4()}>
                                            <div className={`absolute message ${message.fromSelf ? 'text-lg right-0' : ' inline-block text-lg '}`}>
                                                <p className={`py-2 px-4 rounded-md  ${message.fromSelf ? 'bg-[rgb(0,92,75)]' : 'bg-[rgb(34,46,53)] '}`}>{message.message}</p>
                                            </div>
                                        </div>
                                    )
                                }
                                )}
                            </div >
                        </div>
                        < ChatInput handleSendMessage={handleSendMessage} />
                    </div >)
            }
        </>
    )
}
