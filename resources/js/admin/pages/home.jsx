import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Link} from "react-router-dom";
import useOutsideClick from "../../user/pages/componets/View/useOutsideClick";
import { HiArrowPath } from "react-icons/hi2";

function home() {
    const [posts, setPosts] = useState([]);
    let [openDelete, setOpenDelete]= useState(false);
    const [search, setSearch] = useState();
    const [visible, setVisible] = useState(12);
    const [popup, setPopup] = useState("");
    const ref = useRef();

    const MorePosts= () =>{
        setVisible((visible) => visible + 4);
    }

    useOutsideClick(ref, () => {
        if(openDelete) setOpenDelete(false);
    });

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

    const deletePost= (id) =>{
        axios.delete('/post/'+id).then(res=>{
            window.location.reload();
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
                                    <div className='hover:shadow-sm hover:bg-white'>
                                    <Link to={{ pathname :"/admin/view/"+posts.id }}>
                                        <div className='mb-1.5'>
                                            <img src={ "http://127.0.0.1:5173/storage/app/public/images/" +posts.photo}  alt={posts.photo}  className='rounded-xl aspect-video object-cover'/>
                                        </div>
                                            <h3 className='text-base home__posts-body break-all '>{ posts.title}</h3>
                                            <p className='truncate text-sm font-normal text-gray-600'>{ posts.body}</p>
                                    </Link>
                                    </div>
                                        <div  className='flex justify-center items-center gap-4 pt-4  '>
                                            <Link to={{ pathname :"edit/"+posts.id }}>
                                            <button className='text-zinc-700
                                            hover:text-blue-500   border-2   border-blue-500 focus:ring- focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center' type='button'> 編集
                                            </button>
                                            </Link>
                                            <div onClick={() =>{setPopup(posts.id)}}>
                                            <button type="button" className="text-zinc-700 border-2   border-rose-500 hover:text-red-500 focus:ring- focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center" onClick={() => setOpenDelete(!openDelete)}
                                            >
                                            削除
                                            </button>
                                            </div>
                                        </div>
                                    {popup == posts.id ?
                                        <>
                                        <div className={`${openDelete ? 'z-40 fixed inset-0 bg-black bg-opacity-25  flex justify-center items-center':' hidden'}`}>
                                            <div className='w-[400px] flex flex-col'>
                                                <div ref={ref} className="bg-white px-4 py-3 rounded">
                                                    <div className='mb-3'>
                                                        <p>記事の削除</p>
                                                        <p>記事を完全に削除しますか？</p>
                                                    </div>
                                                    <div className='flex justify-center items-center gap-4'>
                                                        <div className='md:px-5 py-2.5 text-center hover:bg-slate-200 rounded' >
                                                            <button onClick={() => setOpenDelete(!openDelete)} >キャンセル</button>
                                                        </div>
                                                        <div onClick={() => setOpenDelete(!openDelete)}>
                                                            <button type="button" className=' text-white bg-red-600 hover:bg-red-500 focus:ring- focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'    onClick={()=>{deletePost(posts.id)}}>
                                                                削除
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>:''}
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
