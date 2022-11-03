import axios from 'axios';
import { Routes, Route, Link } from 'react-router-dom';
import Home from '../home';


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
            ログイン済みadmin
            <li>
                <Link className='no-underline' to="/">Home</Link>
            </li>
            <li>
                <button className="btn" onClick={logoutUser}>Logout</button>
            </li>

        </ul>
        <div className="">
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </div>
    </>
    );
}

export default Auth;

