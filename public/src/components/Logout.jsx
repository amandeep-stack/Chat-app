import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BiPowerOff } from 'react-icons/bi'

export const Logout = () => {
    const navigate = useNavigate();
    const handleClick = async () => {
        localStorage.clear();
        navigate('/login')
    }
    return (
        <div className='text-2xl  bg-purple-500  flex justify-center items-center h-[50px] w-[50px] rounded-lg'>
            <BiPowerOff onClick={handleClick} />
        </div>
    )
}
