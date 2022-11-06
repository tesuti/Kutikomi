import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from '../pages/home';
import View from '../pages/view';


function Auth() {

    const logoutUser = (e)=>{
        e.preventDefault();
        axios.post('/logout').then((res)=>{
            window.location.reload();
        })
    }
    return (
    <>
        <ul className="hidden md:flex ">
            ログイン済み
            <li>
                <Link className='no-underline' to="/">Home</Link>
            </li>
            <li>
                <button className="btn" onClick={logoutUser}>Logout</button>
            </li>

        </ul>
        <div className="">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path='/view/:id' element={<View />} />
            </Routes>
        </div>
    </>
    );
}

export default Auth;

