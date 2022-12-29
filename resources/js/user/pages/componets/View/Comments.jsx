
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import useOutsideClick from "./useOutsideClick";
// import moment from 'moment';
// import 'moment/locale/ja';

const  Comments = () => {
    const [userdetail,setUserdetail] = useState('');
    const [commentField, setCommentField] = useState([]);

    const [editComment, setEditComment] = useState("");
    const [editRating, setEditRating] = useState("0");

    const [popup, setPopup] = useState("");
    let [sidebar, setSidebar]= useState(false);
    let [openEdit, setOpenEdit]= useState(false);
    let [openDelete, setOpenDelete]= useState(false);

    const [hover, setHover] = useState(null);

    const {id} = useParams();

    const ref = useRef();

    useOutsideClick(ref, () => {
        if(openDelete) setOpenDelete(false);
        else if (sidebar) setSidebar(false);
    });




    const editData = {
        comment: editComment,
        rating: editRating,
        id:id,
    };

    const submitEdit = (id)=>{
        axios.put('/comment/'+id,editData).then((res)=>{
        })
    }

    useEffect(() =>{
        fetchUserDetail();
        fetchComment();
    },[]);

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

    const fetchUserDetail = () =>{
        axios.get('/me').then((res)=>{
            setUserdetail(res.data);
    });
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
    {userdetail.id == commentField.user_id ?
        <>
    <div>
    {/* :を押したidを取得 */}
    <div onClick={() =>{setPopup(commentField.id)}} >
        <button  className='p-4 hover:text-purple-600 ' onClick={() => setSidebar(!sidebar)}>:</button>
    </div>
    {popup == commentField.id ?
        <>

        <ul className={`
            ${sidebar ? '':' hidden'}`}>
            <div ref={ref} className='bg-white py-3.5 px-4 right-14 bottom-0 rounded absolute shadow-md'>
                <li className='text-xl'>
                    <div>
                        <button onClick={() => setOpenEdit(!openEdit)} className="text-gray-800 hover:text-gray-400 duration-500 mb-2.5" >編集
                        </button>
                    </div>
                </li>
                <li  onClick={() => setOpenDelete(!openDelete)} className=' text-xl '>
                <button className="text-gray-800 hover:text-gray-400 duration-500" >削除</button>
            </li>
        </div>
        </ul>


    <div className={`
    ${openEdit ? 'z-40 fixed inset-0 bg-black bg-opacity-25  flex justify-center items-center':' hidden'}`}>
        <div className='w-[600px] flex flex-col'>
                <div ref={ref} className="bg-white p-2 rounded">
                    <div className='mb-7'>

                        <label className='block mb-2 text-sm font-medium text-gray-900'>評価</label>
            {[...Array(5)].map((star, i) => {
            const editRatingValue = i + 1

            return (
            <label key={editRatingValue}>
                <input
                type="radio"
                name="rating"
                value={editRatingValue}
                onChange={(e) => setEditRating(e.target.value)}
                />
                <FaStar
                className="star"
                color={editRatingValue <= (hover || editRating) ? "#ffc107" : "#e4e5e9"}

                size={20}
                onMouseEnter={() => setHover(editRatingValue)}
                onMouseLeave={() => setHover(null)}
                />
            </label>
        );
        })}
        <span>　{editRating}/5</span>

            <label className='block mb-2 text-sm font-medium text-gray-900'>コメント</label>
                <input type="text" name='comment' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                            value={editComment || ''}
                            onChange={(e) => setEditComment(e.target.value)}
                        />
                    </div>
                <div className='flex justify-center items-center gap-4'>
                        <button className='md:px-5 py-2.5 text-center hover:bg-slate-200 rounded' onClick={() => setOpenEdit(!openEdit)}>キャンセル</button>
                    <div onClick={() => setOpenEdit(!openEdit)}>
                        <button className=' text-white bg-blue-700 hover:bg-blue-800 focus:ring- focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center' type='button' onClick={() =>{submitEdit(commentField.id)}}> 編集
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

        <div className={`
            ${openDelete ? 'z-40 fixed inset-0 bg-black bg-opacity-25  flex justify-center items-center':' hidden'}`}>
            <div className='w-[400px] flex flex-col'>
                <div ref={ref} className="bg-white p-2 rounded">
                    <div className='mb-3'>
                        <p>コメントの削除</p>
                        <p>コメントを完全に削除しますか？</p>
                    </div>
                    <div className='flex justify-center items-center gap-4'>
                        <div className='md:px-5 py-2.5 text-center hover:bg-slate-200 rounded' >
                            <button onClick={() => setOpenDelete(!openDelete)} >キャンセル</button>
                        </div>
                        <div onClick={() => setOpenDelete(!openDelete)}>
                            <button type="button" className=' text-white bg-red-700 hover:bg-red-800 focus:ring- focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                            onClick={()=>{deleteComment(commentField.id)}}>
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

</>
:''}
</div>
</div>
))}

</div>
    </>
  )
}

export default Comments


