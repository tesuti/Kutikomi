import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from '../pages/home';
import Rating from '../pages/rating';
import View from '../pages/view'

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
                <Link className='no-underline' to="/">ホーム</Link>
            </li>
            <li>
                <Link className='no-underline' to="/rating">ランキング</Link>
            </li>
            <button
                onClick={login}
                className="nav-link">ログイン
            </button>
            <button
                onClick={register}
                className="nav-link">登録
            </button>
        </ul>
        <div className="">
            <Routes>
            <Route path="/" element={<Home />} />
                <Route path="/rating" element={<Rating />} />
                <Route path='/view/:id' element={<View />} />
            </Routes>
        </div>
    </>
    );
}

export default Guest;

