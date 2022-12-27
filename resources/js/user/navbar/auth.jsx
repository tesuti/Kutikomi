
import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from '../pages/home';
import Rating from '../pages/rating';
import View from '../pages/view'
import UserName from './userName';


function Auth() {


    let [sidebar, setSidebar]= useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    return (
        <div className='bg-stone-50'>
        <div className='shadow-md w-full sticky top-0 left-0 z-50'>
          <div className='flex items-center justify-between bg-white py-4 md:px-10 px-7'>
          <div className='font-bold text-xl cursor-pointer flex  item-center font-[Poppins] text-gray-800'>
          <div onClick={showSidebar} className='text-3xl  -8 top-6 cursor-pointer md:hidden'>
            {sidebar ? 'X' : '='}
          </div>
            <Link  to="/">
                <p className="text-gray-800 hover:text-gray-400 duration-500" >S/A</p>
            </Link>
          </div>


          <div className='md:flex md:justify-end'>
          <ul
            className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9  ease-in ${sidebar ? 'top-20   ':'top-[-490px]  duration-500 '}`}
            onClick={showSidebar}
            >
            <li className='md:ml-8 text-xl md:my-0 my-7 '>
                <Link  to="/">
                    <p className="text-gray-800 hover:text-gray-400 duration-500" >ホーム</p>
                </Link>
            </li>
            <li className='md:ml-8 text-xl md:my-0 my-7'>
                <Link  to="/rating">
                    <p className="text-gray-800 hover:text-gray-400 duration-500" >ランキング</p>
                </Link>
            </li>



          </ul>
          <div  className=' right-8 top-6 cursor-pointer '>
            <UserName />
          </div>
          </div>
          </div>
        </div>

        <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/rating" element={<Rating />} />
                    <Route path='/view/:id' element={<View />} />
                </Routes>
            </div>
        </div>
    );
}

export default Auth;

