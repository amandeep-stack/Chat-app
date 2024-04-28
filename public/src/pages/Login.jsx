import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/ReactToastify.css"
import { loginRoute } from '../utils/API-routes';

export const Login = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        password: "",
    })
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark'
    }


    useEffect(() => {
        if (localStorage.getItem('chat-app-user')) {
            navigate('/')
        }
    })


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            console.log("in validations")
            const { password, username } = values;
            const { data } = await axios.post(loginRoute, {
                username,
                password
            });
            if (data.status === false) {
                toast.error(data.msg, toastOptions)
            }
            if (data.status === true) {
                localStorage.setItem('chat-app-user', JSON.stringify(data.user))
                navigate('/')
            }
        }
    }

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    const handleValidation = () => {
        const { password, username } = values;
        if (username.length === '') {
            toast.error("Email and Password is required", toastOptions);
            return false
        }
        if (password.length === '') {
            toast.error("Email and Password is required", toastOptions);
            return false
        }
        return true;
    }

    return (
        <>
            <div className='h-[100vh] flex items-center justify-center  bg-zinc-900'>
                <form className='flex flex-col items-center gap-6' onSubmit={(e) => handleSubmit(e)}>
                    <div className='brand'>
                        <h1 className='text-5xl text-purple-600'>Snixx.</h1>
                    </div>
                    <input
                        className='bg-zinc-600 border-none text-white outline-white w-[800px] text-center px-2 py-2 text-lg rounded-md'
                        type='text'
                        placeholder='username'
                        name='username'
                        onChange={(e) => { handleChange(e) }}
                    />
                    <input
                        className='bg-zinc-600 border-none text-white outline-white w-[800px] text-center px-2 py-2 text-lg rounded-md'
                        type='password'
                        placeholder='password'
                        name='password'
                        onChange={(e) => { handleChange(e) }}
                    />
                    <button className='bg-purple-800 px-8 py-2 rounded-md text-white' type='submit'>Log In</button>
                    <span className='text-purple-200'>New to Snixx.? <Link className='text-purple-600 ml-2' to='/register'>Register</Link ></span>
                </form>
            </div >
            <ToastContainer />
        </>
    )
}
