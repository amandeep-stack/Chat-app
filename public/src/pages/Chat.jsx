import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { allUsersRoute, host } from '../utils/API-routes';
import { Contact } from '../components/Contact';
import { Welcome } from '../components/Welcome';
import { ChatContainer } from '../components/ChatContainer';
import { io } from 'socket.io-client'

export const Chat = () => {

    const socket = useRef();
    const navigate = useNavigate();
    const [contacts, setContacts] = useState([])
    const [currentUser, setCurrentUser] = useState(undefined)
    const [currentChat, setCurrentChat] = useState(undefined)
    const [isLoaded, setIsLoaded] = useState(false)


    useEffect(() => {
        if (currentUser) {
            socket.current = io(host)
            socket.current.emit('add-user', currentUser._id)
        }
    })

    useEffect(() => {

        setCurrentChat(undefined)

        const gettingAllUsers = async () => {
            if (!localStorage.getItem('chat-app-user')) {
                navigate('/login')
            }
            else {
                setCurrentUser(await JSON.parse(localStorage.getItem('chat-app-user')))
                setIsLoaded(true)
            }
        }
        gettingAllUsers();
    }, [])


    useEffect(() => {
        const func = async () => {
            if (currentUser) {
                console.log("current user", currentUser)
                const { data } = await axios.get(`${allUsersRoute}/${currentUser._id}`)
                console.log("response data", data);
                setContacts(data);
            }
        }
        func()
    }, [currentUser])

    const handleChatChange = (chat) => {
        setCurrentChat(chat)
    }


    return (
        <div className='h-[100vh] w-[100vw] bg-black flex flex-col justify-center gap-2 items-center'>
            <div className='h-[95vh] w-[97.4vw] bg-[rgb(34,46,53)] relative grid grid-cols-4'>
                <Contact changeChat={handleChatChange} contacts={contacts} currentUser={currentUser} />
                {
                    isLoaded && currentChat === undefined ?
                        (
                            <Welcome currentUser={currentUser} />
                        ) :
                        (
                            <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket} />
                        )
                }
            </div>
        </div>
    )
}

