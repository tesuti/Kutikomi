import React from 'react';
import ReactDOM from 'react-dom';

function Example() {
    const login = () =>{
        window.location.replace("/login")
    }
    const register = () =>{
        window.location.replace("/register")
    }
    const admin = () =>{
        window.location.replace("admin/login")
    }
    return (
    <>
    <button
        onClick={login}
        className="nav-link">login
    </button>
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

export default Example;

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
