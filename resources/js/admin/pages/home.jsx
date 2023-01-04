import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Link} from "react-router-dom";
import useOutsideClick from "../../user/pages/componets/View/useOutsideClick";

function home() {
    const [posts, setPosts] = useState([]);
    let [openDelete, setOpenDelete]= useState(false);
    const [popup, setPopup] = useState("");
    const ref = useRef();

    useOutsideClick(ref, () => {
        if(openDelete) setOpenDelete(false);
    });

    useEffect(() =>{
        fetchAllPost();
    },[]);

    const fetchAllPost = async() =>{
        await axios.get('/post').then(res=>{
            setPosts(res.data);
        })
    }

    const deletePost= (id) =>{
        axios.delete('/post/'+id).then(res=>{
        })
    }



    function renderElement(){
        if(posts){
            return(
                <div className=' w-h  auto-mt'>
                    <div className=" container  max-w-5xl mx-auto p-0 sm:py-36 px-2" >
                        <div className='pt-3 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6'>
                            {posts.map((posts, i)=>(
                                <div  key={i}>
                                    <div className='hover:shadow-sm hover:bg-white'>
                                    <Link to={{ pathname :"/admin/view/"+posts.id }}>
                                        <div className='mb-1.5'>
                                            <img src={ "http://127.0.0.1:5173/storage/app/public/images/" +posts.photo}  alt={posts.photo}  className='rounded-xl'/>
                                        </div>
                                            <h3 className='text-base home__posts-body break-all '>{ posts.title}</h3>
                                            <p className='truncate text-sm font-normal text-gray-600'>{ posts.body}</p>
                                    </Link>
                                    </div>
                                        <div  className='flex justify-center items-center gap-4 pt-4  '>
                                            <Link to={{ pathname :"edit/"+posts.id }}>
                                            <button className=' text-white bg-blue-700 hover:bg-blue-800 focus:ring- focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center' type='button'> 編集
                                            </button>
                                            </Link>
                                            <div onClick={() =>{setPopup(posts.id)}}>
                                            <button type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring- focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center" onClick={() => setOpenDelete(!openDelete)}
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
                                                        <p>コメントの削除</p>
                                                        <p>コメントを完全に削除しますか？</p>
                                                    </div>
                                                    <div className='flex justify-center items-center gap-4'>
                                                        <div className='md:px-5 py-2.5 text-center hover:bg-slate-200 rounded' >
                                                            <button onClick={() => setOpenDelete(!openDelete)} >キャンセル</button>
                                                        </div>
                                                        <div onClick={() => setOpenDelete(!openDelete)}>
                                                            <button type="button" className=' text-white bg-red-700 hover:bg-red-800 focus:ring- focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'    onClick={()=>{deletePost(posts.id)}}>
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
                    </div>
                </div>
                )}else{
            return <p>Loading.....</p>
        }
    }
    return (
    <div>
{ renderElement() }
    </div>
    )
}

export default home
