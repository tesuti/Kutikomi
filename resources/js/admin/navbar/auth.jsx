import axios from 'axios';
import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from '../pages/home';
import Post from '../pages/post';
import View from '../pages/view'
import User from '../pages/user'
import Edit from '../pages/edit'
import UserName from './userName';
import { HiBars3,HiXMark } from "react-icons/hi2";

function Auth() {



    let [sidebar, setSidebar]= useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    return (
        <div className=''>
        <div className='shadow-md w-full sticky top-0 left-0 z-50'>
          <div className='flex items-center justify-between bg-white py-4 md:px-10 px-7'>
          <div className='font-bold text-xl cursor-pointer flex  item-center font-[Poppins] text-gray-800'>
          <div onClick={showSidebar} className='text-3xl  -8 top-6 cursor-pointer md:hidden'>
            {sidebar ? <HiXMark /> : <HiBars3 />}
          </div>
            <Link  to="/admin">
                <p className="text-lg text-gray-800 hover:text-gray-400 duration-500" >S/A管理者画面</p>
            </Link>
          </div>


          <div className=''>
            <div className='flex justify-end'>
          <div  className=' right-8 top-6 cursor-pointer '>
            <UserName />
          </div>
          </div>
          <ul
            className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9  ease-in ${sidebar ? 'top-20   ':'top-[-490px]  duration-500 '}`}
            onClick={showSidebar}
            >
            <li className='md:ml-8 text-xl md:my-0 my-7'>
                <Link className='text-gray-800 hover:text-gray-400 duration-500' to="/admin">ホーム</Link>
            </li>
            <li className='md:ml-8 text-xl md:my-0 my-7'>
                <Link className='text-gray-800 hover:text-gray-400 duration-500' to="/admin/post">記事の投稿</Link>
            </li>
            <li className='md:ml-8 text-xl md:my-0 my-7'>
                <Link className='text-gray-800 hover:text-gray-400 duration-500' to="/admin/user">ユーザー管理</Link>
            </li>
          </ul>

          </div>
          </div>
        </div>

        <div>
            <Routes>
                <Route path="/admin" element={<Home />} />
                <Route path="/admin/post" element={<Post />} />
                <Route path="/admin/user" element={<User />} />
                <Route path='/admin/view/:id' element={<View />} />
                <Route path='/admin/edit/:id' element={<Edit />} />
            </Routes>
            </div>
        </div>
    );
}

export default Auth;

