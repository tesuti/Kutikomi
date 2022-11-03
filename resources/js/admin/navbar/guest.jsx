import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from '../home';

function Guest() {
    const register = () =>{
        window.location.replace("admin/register")
    }
    const admin = () =>{
        window.location.replace("admin/login")
    }
    return (
        <>


    <ul className="hidden md:flex ">
            <li>
                <Link className='no-underline' to="/">Home</Link>
            </li>
            <button
                onClick={admin}
                className="nav-link">管理者
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

