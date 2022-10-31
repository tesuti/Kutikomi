import React from 'react';
import ReactDOM from 'react-dom';

function Guest() {
    const login = () =>{
        window.location.replace("/login")
    }
    const register = () =>{
        window.location.replace("/register")
    }
    return (
    <>
    <button
        onClick={login}
        className="nav-link">login
    </button>
    <button
        onClick={register}
        className="nav-link">register
    </button>
    </>
    );
}

export default Guest;

