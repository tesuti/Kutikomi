import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

function Admin() {

    const register = () =>{
        window.location.replace("admin/register")
    }
    const admin = () =>{
        window.location.replace("admin/login")
    }
    return (
    <>

    <button
        onClick={admin}
        className="nav-link">管理者
    </button>
    <button
        onClick={register}
        className="nav-link">register
    </button>
    </>
    );
}

export default Admin;

if (document.getElementById('admin')) {
    ReactDOM.render(<Admin />, document.getElementById('admin'));
}
