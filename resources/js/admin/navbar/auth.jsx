import axios from 'axios';
import { Routes, Route, Link } from 'react-router-dom';
import Home from '../pages/home';
import Post from '../pages/post';

function Auth() {

    const logoutUser = (e)=>{
        e.preventDefault();
        axios.post('/logout').then((res)=>{
            window.location.reload();
        })
    }


    return (
    <>
        <ul className="">
            ログイン済みadmin
            <li>
                <Link className='' to="/admin">Home</Link>
            </li>
            <li>
                <Link className='' to="/admin/post">記事の投稿</Link>
            </li>
            <li>
                <button className="" onClick={logoutUser}>Logout</button>
            </li>

        </ul>
        <div className="">
            <Routes>
                <Route path="/admin" element={<Home />} />
                <Route path="/admin/post" element={<Post />} />
            </Routes>
        </div>
    </>
    );
}

export default Auth;

