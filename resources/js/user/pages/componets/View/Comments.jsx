
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
const  Comments = () => {
    const [userdetail,setUserdetail] = useState('');
    const [commentField, setCommentField] = useState([]);

    const [editComment, setEditComment] = useState("");
    const [editRating, setEditRating] = useState("");

    const [popup, setPopup] = useState("");
    let [sidebar, setSidebar]= useState(false);
    let [openEdit, setOpenEdit]= useState(false);
    let [openDelete, setOpenDelete]= useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    const {id} = useParams();

    // const  menuRef =  useRef();
    // const  imgRef =  useRef();
    const editData = {
        comment: editComment,
        rating: editRating,
        id:id,
    };

    // window.addEventListener('click',(e)=>{
    //     if(e.target !== menuRef.current && e.target !==  imgRef.current){
    //         const showSidebar = () => setSidebar(!sidebar);
    //     }
    //   });

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
{commentField.map((commentField,i)=>(

<div key={commentField.id}>
    <p>{ ++i}</p>
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

{userdetail.id == commentField.user_id ?
<>

<div>
    <div  onClick={showSidebar}>
        <button  onClick={() =>{setPopup(commentField.id)}}>:</button>
    </div>
    {popup == commentField.id ?
        <>
        <ul   className={` top-6 cursor-pointer
            ${sidebar ? 'hidden':' '}`}>
        <li className='md:ml-8 text-xl md:my-0 my-7 '>
            <div >
                <button onClick={() => setOpenEdit(!openEdit)} className="text-gray-800 hover:text-gray-400 duration-500" >編集</button>
            </div>
        </li>
        <li  onClick={() => setOpenDelete(!openDelete)} className='md:ml-8 text-xl md:my-0 my-7'>
            <button className="text-gray-800 hover:text-gray-400 duration-500" >削除</button>
        </li>

    <div  className={`  -8 top-6 cursor-pointer
                ${openEdit ? '':' hidden'}`}>
        <label>コメント</label>
            <input type="text" name='comment' className=''
            value={editComment || ''}
            onChange={(e) => setEditComment(e.target.value)}
            />

        <label>評価</label>
            <input type="text" name='rating' className=''
            value={editRating || ''}
            onChange={(e) => setEditRating(e.target.value)}
            />

        <div onClick={showSidebar}>
            <button type='button' onClick={() =>{submitEdit(commentField.id)}}> 編集
            </button>
        </div>
    </div>
        <div className={` top-6 cursor-pointer
            ${openDelete ? '':' hidden'}`}>
                <p>コメントの削除</p>
                <p>コメントを完全に削除しますか？</p>
                <button onClick={showSidebar}>キャンセル</button>
                <div onClick={showSidebar}>
                    <button type="button" className="btn"
                    onClick={()=>{deleteComment(commentField.id)}}>
                        削除
                    </button>
            </div>
        </div>
    </ul>
     </>
        :''}
  </div>

</>
:''
}
    <p>------</p>
</div>
))}
    </>
  )
}

export default Comments


