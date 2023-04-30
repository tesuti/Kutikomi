import axios from 'axios';
import React, { useContext, useEffect, useState,useRef } from 'react'
import { FaStar } from 'react-icons/fa';
import { LoginUser } from '../../User';
import { Link } from 'react-router-dom';
import { HiEllipsisHorizontal } from 'react-icons/hi2';
import useOutsideClick from './componets/View/useOutsideClick';


function profile() {
    const [posts, setPosts] = useState([]);
    const [visible, setVisible] = useState(10);
    const userdetail =useContext(LoginUser);
    const [popup, setPopup] = useState("");

    let [openDelete, setOpenDelete]= useState(false);

    let [sidebar, setSidebar]= useState(false);
    const ref = useRef();
    const MorePosts= () =>{
        setVisible((visible) => visible + 4);
    }

    useOutsideClick(ref, () => {
        if(openDelete) setOpenDelete(false);
        else if (sidebar) setSidebar(false);
    });
    useEffect(() =>{
        fetchAllPost();
    },[]);

    const fetchAllPost = async() =>{
        await axios.get('/submitPost').then(res=>{
                setPosts(res.data);
        })
}

const deletePost= (id) =>{
    axios.delete('/post/'+id).then(res=>{
        window.location.reload();
    })
}

    return (
        <div className=' w-h  auto-mt'>
        <div className=" container  max-w-4xl mx-auto p-0 py-36 px-2">
        <h1>{userdetail.name}</h1>
        <div className='pt-3 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6' >
    {posts.slice(0,visible).map((posts, i)=>(
        <div key={i}>
            <div className=' text-right'>
                {/* :を押したidを取得 */}
                <div onClick={() =>{setPopup(posts.id)}} >
        <button  className=' text-black ' onClick={() => setSidebar(!sidebar)}><HiEllipsisHorizontal /></button>
    </div>
    {popup == posts.id ?
    <>
    <ul className={`
            ${sidebar ? '':' hidden'}`}>
            <div ref={ref} className='bg-white  rounded z-30 absolute shadow-md'>
                <li className='text-xl'>
                    <div>
                    <Link to={{ pathname :"edit/"+posts.id }}>
                        <button className='text-gray-800 hover:text-gray-400 duration-500 px-4 pt-3.5 pb-1.5' type='button'> 編集
                        </button>
                    </Link>
                    </div>
                </li>
                <li  onClick={() => setOpenDelete(!openDelete)} className=' text-xl '>
                <button className="text-gray-800 hover:text-gray-400 duration-500 px-4 pb-3.5 pt-1.5" >削除</button>
            </li>
        </div>
        </ul>

        {/* 記事を削除 */}
        <div className={`
            ${openDelete ? 'z-40 fixed inset-0 bg-black bg-opacity-25  flex justify-center items-center':' hidden'}`}>
            <div className='w-[400px] flex flex-col'>
                <div ref={ref} className="bg-white px-4 py-3 rounded">
                    <div className='mb-3 text-left'>
                        <p>コメントの削除</p>
                        <p>コメントを完全に削除しますか？</p>
                    </div>
                    <div className='flex justify-center items-center gap-4'>
                        <div className='md:px-5 py-2.5 text-center hover:bg-slate-200 rounded' >
                            <button onClick={() => setOpenDelete(!openDelete)} >キャンセル</button>
                        </div>
                        <div onClick={() => setOpenDelete(!openDelete)}>
                            <button type="button" className=' text-white bg-red-700 hover:bg-red-800 focus:ring- focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                            onClick={()=>{deletePost(posts.id)}}>
                                削除
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
        :
    <>
    </>}
            </div>
            <div className='static '>
        <Link to={{ pathname :"/sa/view/"+posts.id }}>
            <div className='mb-1.5'>
                <img src={ "http://127.0.0.1:5173/storage/app/public/images/" +posts.photo}  alt={posts.photo}  className='rounded-xl aspect-video object-cover'/>
            </div>
            <div>
            <div className='flex justify-between'>
            <p className='truncate text-sm font-normal text-gray-500'>{ posts.user.name}</p>

            </div>
                <h3 className='text-base home__posts-body break-all  font-normal '>{ posts.title}</h3>
                <p className='truncate text-sm font-normal text-gray-600'>{ posts.body}</p>
            </div>
        </Link>
        </div>
    </div>
))}

        </div>
        {/* <div className='py-3'>
            <button className='py-2.5 px-5 rounded bg-slate-200 text-zinc-700' onClick={MorePosts}>表示</button>
        </div> */}
      </div>
      </div>
    )
}

export default profile
