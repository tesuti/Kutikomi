import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import useOutsideClick from "../../../../user/pages/componets/View/useOutsideClick";
// import moment from 'moment';
// import 'moment/locale/ja';

const  Comments = () => {
    const [commentField, setCommentField] = useState([]);
    let [openDelete, setOpenDelete]= useState(false);
    const [popup, setPopup] = useState("");
    const ref = useRef();

    const {id} = useParams();

    useEffect(() =>{
        fetchComment();
    },[]);

    useOutsideClick(ref, () => {
        if(openDelete) setOpenDelete(false);
    });

    const fetchComment = () =>{
        axios.get('/comment/'+ id).then((res)=>{
            setCommentField(
                res.data
            );
        });
    }

    const deleteComment= (id) =>{
        axios.delete('/comment/'+id).then(res=>{
        })
    }

  return (
    <>
<div className='pb-10'>
    {commentField.map((commentField,i)=>(
        <div className='' >
            <div className='pb-4 flex justify-between relative'>
                <div key={commentField.id}>
                    <p>{ commentField.user.name}</p>
                    {[...Array(5)].map((star,i) => {
                    const ratingValue = i + 1
                    return (
                    <label key={i}>
                        <input
                        type="radio"
                        name="rating"
                        value={ratingValue}
                        className="hidden"
                        />
                        <FaStar
                        className="star"
                        color={ratingValue <= (commentField.rating) ? "#ffc107" : "#e4e5e9"}
                        size={20}
                        />
                    </label>
                    )
                    })}
                    <p>{ commentField.comment}</p>
                    {/* <p>{moment( commentField.created_at).fromNow()}</p> */}
                </div>
                <div onClick={() =>{setPopup(commentField.id)}}>
                    <button type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring- focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center" onClick={() => setOpenDelete(!openDelete)}>
                        削除
                    </button>
                </div>
                {popup == commentField.id ?
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
                                            <button type="button" className=' text-white bg-red-700 hover:bg-red-800 focus:ring- focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'    onClick={()=>{deleteComment(commentField.id)}}>
                                                削除
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                    :''}
            </div>
        </div>
    ))}
</div>
</>
)}

export default Comments


