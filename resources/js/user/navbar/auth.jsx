import axios from 'axios';
import { Routes, Route, Link } from 'react-router-dom';
import Home from '../pages/home';
import Rating from '../pages/rating';
import View from '../pages/view'
import UserName from './userName';


function Auth() {

    const logoutUser = (e)=>{
        e.preventDefault();
        axios.post('/logout').then((res)=>{
            window.location.reload();
        })
    }

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
            <li>
            <Link className="no-underline border-none bg-transparent text-black mr-4"><UserName /></Link>
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

