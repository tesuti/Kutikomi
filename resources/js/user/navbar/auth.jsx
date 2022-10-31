import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from '../home';


function Auth() {
    const login = () =>{
        window.location.replace("/login")
    }
    const register = () =>{
        window.location.replace("/register")
    }
    return (
    <>
        <ul className="hidden md:flex ">
            ログイン済み
            <li>
                <Link className='no-underline' to="/">Home</Link>
            </li>

        </ul>
        <div className="">
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </div>
    </>
    );
}

export default Auth;

