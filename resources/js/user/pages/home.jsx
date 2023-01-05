import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { HiArrowPath } from "react-icons/hi2";

function home() {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState();
    const [visible, setVisible] = useState(12);

    const MorePosts= () =>{
        setVisible((visible) => visible + 4);
    }

    useEffect(() =>{
        fetchAllPost();
    },[]);

    const data = {
        search:search,
    };
    const fetchAllPost = async() =>{
            await axios.post('/posts',data).then(res=>{
                setPosts(res.data);
            })
    }
    const reload = () =>{
        window.location.reload();
    }

    return (
    <div>


<div className=' w-h  auto-mt'>
            <div className=" container  max-w-5xl mx-auto p-0 sm:py-36 px-2" >
                <div className='flex pt-3'>
                    <input type="text" name='comment' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                    placeholder='検索'
                        value={search || ''}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={fetchAllPost}
                        />
                        <button type='button' className="text-white  bg-slate-300 hover:bg-slate-200 focus:ring- focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-4 py-2.5 text-center" onClick={reload} >
                            <div className="text-xl">
                            <HiArrowPath /></div>
                        </button>
                </div>
                <div className='pt-3 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6'>
                    {posts.slice(0,visible).map((posts, i)=>(
                        <div  key={i}>
                            <Link to={{ pathname :"/view/"+posts.id }}>
                                <div className='mb-1.5'>
                                    <img src={ "http://127.0.0.1:5173/storage/app/public/images/" +posts.photo}  alt={posts.photo}  className='rounded-xl'/>
                                </div>
                                <div className=''>
                                    <h3 className='text-base home__posts-body break-all  font-normal '>{ posts.title}</h3>
                                    <p className='truncate text-sm font-normal text-gray-600'>{ posts.body}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
                <div className='py-3'>
                    <button className='py-2.5 px-5 rounded bg-slate-200 text-zinc-700' onClick={MorePosts}>表示</button>
                </div>
            </div>
        </div>
    </div>
    )
}

export default home
