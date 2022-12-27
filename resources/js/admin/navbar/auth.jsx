import axios from 'axios';
import { Routes, Route, Link } from 'react-router-dom';
import Home from '../pages/home';
import Post from '../pages/post';
import View from '../pages/view'
import User from '../pages/user'
import Edit from '../pages/edit'
import UserName from './userName';

function Auth() {

    const logoutUser = (e)=>{
        e.preventDefault();
        axios.post('/logout').then((res)=>{
            window.location.reload();
        })
    }

    const register = () =>{
        window.location.replace("/admin/register")
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
            <button
                onClick={register}
                className="">新規登録
            </button>
            <li>
            <Link className="no-underline border-none bg-transparent text-black mr-4"><UserName /></Link>
            </li>

        </ul>
            <Routes>
                <Route path="/admin" element={<Home />} />
                <Route path="/admin/post" element={<Post />} />
                <Route path="/admin/user" element={<User />} />
                <Route path='/admin/view/:id' element={<View />} />
                <Route path='/admin/edit/:id' element={<Edit />} />
            </Routes>
    </>
    );
}

export default Auth;

