import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import useOutsideClick from "../../user/pages/componets/View/useOutsideClick";

function User() {
    const [user, setUser] = useState([]);
    let [openDelete, setOpenDelete]= useState(false);
    const [popup, setPopup] = useState("");
    const ref = useRef();

    useEffect(() =>{
        fetchAllUser();
    },[]);

    const fetchAllUser = async() =>{
        await axios.get('/user').then(res=>{
            setUser(res.data);
        })
    }

    const deleteUser= (id) =>{
        axios.delete('/user/'+id).then(res=>{
            window.location.reload();
        })
    }

    useOutsideClick(ref, () => {
        if(openDelete) setOpenDelete(false);
    });

return (
<div className=' w-h h-screen auto-mt'>
    <div className='container max-w-4xl mx-auto p-0 sm:py-36 px-2 mt-5 w-screen flex justify-center items-center'>
        <div className=' bg-white p-4 rounded md:w-[500px]'>

    <div className='flex gap-3'>
        <p>ID</p>
        <p>名前</p>
        <p>　</p>
    </div>

        {user.map((user, i)=>(
            <div key={i} className="pb-3 flex gap-3">
                <p>{ user.id }</p>
                <p>{ user.name }</p>
                <div onClick={() =>{setPopup(user.id)}}>
        <button type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring- focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1.5 text-center"
            onClick={() => setOpenDelete(!openDelete)}>
            削除
        </button>
        </div>
        {popup == user.id ?
            <>
                <div className={`${openDelete ? 'z-40 fixed inset-0 bg-black bg-opacity-25  flex justify-center items-center':' hidden'}`}>
                    <div className='w-[400px] flex flex-col'>
                        <div ref={ref} className="bg-white p-2 rounded">
                            <div className='mb-3'>
                                <p>ユーザーの削除</p>
                                <p>ユーザーを完全に削除しますか？</p>
                            </div>
                            <div className='flex justify-center items-center gap-4'>
                                <div className='md:px-5 py-2.5 text-center hover:bg-slate-200 rounded' >
                                    <button onClick={() => setOpenDelete(!openDelete)} >キャンセル</button>
                                </div>
                                <div onClick={() => setOpenDelete(!openDelete)}>
                                    <button type="button" className=' text-white bg-red-700 hover:bg-red-800 focus:ring- focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'    onClick={()=>{deleteUser(user.id)}}>
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
)
}

export default User
