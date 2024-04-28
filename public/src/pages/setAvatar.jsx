import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import loader from '../assets/loader.gif';
import "react-toastify/ReactToastify.css";
import { setAvatarRoutes } from '../utils/API-routes';
import { Buffer } from 'buffer';

export const SetAvatar = () => {
    const navigate = useNavigate()

    useEffect(() => {
        navigate('/')
    }, [])

    return <>
        <div>hey</div>
    </>
};
