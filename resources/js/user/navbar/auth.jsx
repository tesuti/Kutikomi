import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from '../pages/home';
import Rating from '../pages/rating';
import View from '../pages/view'



function Auth() {

    // const [query,setQuery]= useState("");

    useEffect(() =>{
        fetchAllPost();
    },[]);

    const fetchAllPost = async() =>{
        await axios.get('/comment').then(res=>{
            setPosts(res.data);
        })
    }

    const logoutUser = (e)=>{
        e.preventDefault();
        axios.post('/logout').then((res)=>{
            window.location.reload();
        })
    }

    // const data = {
    //     search:search
    // };

    // const submitForm = (e) =>{
    //     e.preventDefault();
    //     axios.post('/search',data).then((res)=>{
    //         setQuery(res.data);
    //         console.log(query);
    //     })

    // }
    return (
    <>
        <ul className="hidden md:flex ">
            ログイン済み
            <li>
                <Link className='' to="/">ホーム</Link>
            </li>
            <li>
                <Link className='' to="/rating">ランキング</Link>
            </li>
            <li>
                <input type="search" name="search" placeholder="キーワードを入力" aria-label="検索..."
                />
                <button type='button'>検索</button>
            </li>
            <li>
                <button className="btn" onClick={logoutUser}>ログアウト</button>
            </li>

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

export default Auth;

