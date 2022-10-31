import React from 'react';
import ReactDOM from 'react-dom';
import Index from './user/index'
import { BrowserRouter } from 'react-router-dom';

function User() {
    // const login = () =>{
    //     window.location.replace("/login")
    // }
    // const register = () =>{
    //     window.location.replace("/register")
    // }
    return (
        <BrowserRouter>
        <Index />
        </BrowserRouter>
    );
}

export default User;

if (document.getElementById('user')) {
    ReactDOM.render(<User />, document.getElementById('user'));
}
