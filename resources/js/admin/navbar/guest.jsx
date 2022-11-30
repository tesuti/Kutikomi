import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from '../pages/home';


function Guest() {
    const register = () =>{
        window.location.replace("/admin/register")
    }
    const admin = () =>{
        window.location.replace("/admin/login")
    }
    return (
        <>


    <ul className="hidden md:flex ">
            <button
                onClick={admin}
                className="">管理者
            </button>
            <button
                onClick={register}
                className="">register
            </button>
    </ul>
    </>
    );
}

export default Guest;

