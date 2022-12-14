
import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from '../pages/home';
import Rating from '../pages/rating';
import View from '../pages/view'
import UserName from './userName';


function Auth() {


    let [open, setOpen]= useState(false);
    return (
        <>
        <div className='shadow-md w-full sticky top-0 left-0 '>
          <div className='md:flex items-center justify-between bg-white py-4 md:px-10 px-7'>
          <div className='font-bold text-2xl cursor-pointer flex item-center font-[Poppins] text-gray-800'>
            <span className='text-3xl text-indigo-600 mr-1 pt-2'>
              O
            </span>
            Designer
          </div>
          <div onClick={() =>setOpen(!open)} className='text-3xl absolute right-8 top-6 cursor-pointer md:hidden'>
            {open ? 'X' : '='}
          </div>
          <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9  ease-in ${open ? 'top-20   ':'top-[-490px]  duration-500 '}`}>
          <li className='md:ml-8 text-xl md:my-0 my-7'>
                    <Link className="text-gray-800 hover:text-gray-400 duration-500" to="/">ホーム</Link>
                </li>
                <li className='md:ml-8 text-xl md:my-0 my-7'>
                    <Link className="text-gray-800 hover:text-gray-400 duration-500" to="/rating">ランキング</Link>
                </li>
                {/* <li>
                    <input type="search" name="search" placeholder="キーワードを入力" aria-label="検索..."
                    />
                    <button type='button'>検索</button>
                </li> */}

                <li className='md:ml-8 text-xl md:my-0 my-7'>
                <Link className="text-gray-800 hover:text-gray-400 duration-500"><UserName /></Link>
                </li>



          </ul>
          </div>
        </div>

        <div className="bg-stone-50">
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

