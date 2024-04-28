import React from 'react'
import robot from '../assets/robot.gif'

export const Welcome = ({ currentUser }) => {
    return (
        <div className='col-span-3 flex flex-col items-center justify-center text-white'>
            <img src={robot} alt="" />
            <h1 className='text-4xl'>Welcome <span className='text-purple-600'>{currentUser.username}!</span></h1>
            <h2 className='text-xl'>Please select a chat to Start Messaging</h2>
        </div>
    )
}
