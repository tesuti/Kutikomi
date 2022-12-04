import axios from 'axios';
import { Routes, Route, Link } from 'react-router-dom';
import Home from '../pages/home';
import Post from '../pages/post';
import View from '../pages/view'
import User from '../pages/user'
import Edit from '../pages/edit'

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
                <Link className='' to="/admin">ホーム</Link>
            </li>
            <li>
                <Link className='' to="/admin/post">記事の投稿</Link>
            </li>
            <li>
                <Link className='' to="/admin/user">ユーザー管理</Link>
            </li>
            <li>
                <button className="" onClick={logoutUser}>ログアウト</button>
            </li>

        </ul>
        <div className="">
            <Routes>
                <Route path="/admin" element={<Home />} />
                <Route path="/admin/post" element={<Post />} />
                <Route path="/admin/user" element={<User />} />
                <Route path='/admin/view/:id' element={<View />} />
                <Route path='/admin/edit/:id' element={<Edit />} />
            </Routes>
        </div>
    </>
    );
}

export default Auth;

