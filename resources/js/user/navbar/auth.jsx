
import { useEffect, useRef, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from '../pages/home';
import Rating from '../pages/rating';
import View from '../pages/view'
import Edit from '../pages/edit'
import Profile from '../pages/profile'
import UserName from './userName';
import { HiBars3,HiXMark } from "react-icons/hi2";
import CreatePost from '../pages/CreatePost';
import axios from 'axios';

function Auth() {

    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState();
    const [visible, setVisible] = useState(5);

    const [open, setOpen] = useState(false);

    let [sidebar, setSidebar]= useState(false);
    const showSidebar = () => setSidebar(!sidebar);

    const  menuRef =  useRef();
    const imgRef = useRef();

    useEffect(()=> {
        fetchAllPost();
    },[]);
    const data = {
        search:search,
    };
    window.addEventListener('click',(e)=>{
        if(e.target !== menuRef.current && e.target !==  imgRef.current){
            setOpen(false);
        }
      });

      const fetchAllPost = async() =>{
        await axios.post('/posts',data).then(res=>{
                setPosts(res.data);
        })
}
    const reload =()=>{
        window.location.reload();
    }

    return (
        <div >
        <div className='shadow-md w-full sticky top-0 left-0 z-50'>
          <div className='flex items-center justify-between bg-white py-4 md:px-10 px-7'>
          <div className='font-bold text-xl cursor-pointer flex  item-center font-[Poppins] text-gray-800'>
          <div onClick={showSidebar} className='text-3xl top-6 cursor-pointer md:hidden'>
            {sidebar ? <HiXMark /> : <HiBars3 />}
          </div>
            <Link  to="/sa">
                <p className="text-gray-800 hover:text-gray-400 duration-500" >S/A</p>
            </Link>
          </div>

          <input type="text" autocomplete="off" name='comment' className=' relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/5 p-2.5'
                        placeholder='検索'
                        value={search || ''}
                        ref={imgRef}
                        onClick={() => setOpen(!open)}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={fetchAllPost}
                        />
                       <div className=' text-white font-[Poppins] rounded md:ml-8 duration-500'>
       </div>
       <div className='absolute top-24 left-1/4 pd-9'>
       {
        open &&(
          <div ref={menuRef} >
        <div className="bg-white p-4 w-52 shadow-lg  -left-14 top-12 rounded-lg">
          <ul>
            {posts.slice(0,visible).map((posts, i)=>(
                <div onClick={reload}>
                <Link to={{ pathname :"/sa/view/"+posts.id }}>
                    <li onClick={() => setOpen(false)} className=
                    'p-2 text-lg cursor-pointer rounded hover:bg-blue-100' >
                    <button
                        className="text-lg cursor-pointer rounded hover:bg-blue-100 text-gray-800 hover:text-gray-400 duration-500 pl-2 pr-12 py-2">{posts.title}
                    </button>
                    </li>
                </Link>
                </div>
            ))}
          </ul>
        </div>
        </div>
      )}
      </div>
          <div className='md:flex md:justify-end'>
          <ul
            className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9  ease-in ${sidebar ? 'top-20   ':'top-[-490px]  duration-500 '}`}
            onClick={showSidebar}
            >
            <li className='md:ml-8 text-xl md:my-0 my-7 '>
                <Link  to="/sa">
                    <p className="text-gray-800 hover:text-gray-400 duration-500" >ホーム</p>
                </Link>
            </li>
            <li className='md:ml-8 text-xl md:my-0 my-7'>
                <Link  to="/sa/rating">
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
                    <Route path="/sa" element={<Home />} />
                    <Route path="/sa/rating" element={<Rating />} />
                    <Route path="/sa/post" element={<CreatePost />} />
                    <Route path="/sa/profile" element={<Profile />} />
                    <Route path='/sa/view/:id' element={<View />} />
                    <Route path='/sa/profile/edit/:id' element={<Edit />} />
                </Routes>
            </div>
        </div>
    );
}

export default Auth;

