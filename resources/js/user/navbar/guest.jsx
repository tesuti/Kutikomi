import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from '../home';

function Guest() {
    const login = () =>{
        window.location.replace("/login")
    }
    const register = () =>{
        window.location.replace("/register")
    }
    return (
    <>
        <ul className="hidden md:flex ">
            <li>
                <Link className='no-underline' to="/">Home</Link>
            </li>
            <button
                onClick={login}
                className="nav-link">login
            </button>
            <button
                onClick={register}
                className="nav-link">register
            </button>
        </ul>
        <div className="">
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </div>
    </>
    );
}

export default Guest;

