import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/ReactToastify.css"
import { registerRoute } from '../utils/API-routes';

export const Register = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
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
            const { password, username, email } = values;
            const { data } = await axios.post(registerRoute, {
                username,
                email,
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
        const { password, confirmPassword, username, email } = values;
        if (password !== confirmPassword) {
            toast.error("Password and Confirm Password should be same", toastOptions);
            return false
        }
        else if (username.length < 3) {
            toast.error("Username should be greater than 3 characters", toastOptions);
            return false
        }
        else if (password.length < 8) {
            toast.error("Password should be equal or greater than 8 characters", toastOptions);
            return false
        }
        else if (email === "") {
            toast.error("Email is required", toastOptions);
            return false
        };
        return true;
    }

    return (<>
        <div className='h-[100vh] flex items-center justify-center bg-zinc-900'>
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
                    type='email'
                    placeholder='email'
                    name='email'
                    onChange={(e) => { handleChange(e) }}
                />
                <input
                    className='bg-zinc-600 border-none text-white outline-white w-[800px] text-center px-2 py-2 text-lg rounded-md'
                    type='password'
                    placeholder='password'
                    name='password'
                    onChange={(e) => { handleChange(e) }}
                />
                <input
                    className='bg-zinc-600 border-none text-white outline-white w-[800px] text-center px-2 py-2 text-lg rounded-md'
                    type='password'
                    placeholder='confirm password'
                    name='confirmPassword'
                    onChange={(e) => { handleChange(e) }}
                />
                <button className='bg-purple-800 px-8 py-2 rounded-md text-white' type='submit'>Create User</button>
                <span className='text-purple-200'> Already have an account ?<Link className='text-purple-600 ml-2' to='/login'>Login</Link ></span>
            </form>
        </div>
        <ToastContainer />
    </>
    )
}