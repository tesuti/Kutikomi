
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

    const editData = {
        comment: editComment,
        rating: editRating,
        id:id,
    };

    const  menuRef =  useRef();
    const  editRef =  useRef();


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
<div className='a'>
{commentField.map((commentField,i)=>(
    <div className='' >
 <div className='flex justify-between relative'>
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
    </div>
{userdetail.id == commentField.user_id ?
<>

<div >
    {/* :を押したidを取得 */}
    <div   onClick={() =>{setPopup(commentField.id)}} >
        <button  className='p-4 hover:text-purple-600 ' onClick={showSidebar}>:</button>
    </div>

    {popup == commentField.id ?
        <>

        <ul   className={`
            ${sidebar ? 'hidden':' '}`}>
            <div ref={menuRef} className='bg-white py-3.5 px-4 right-14 bottom-0 rounded absolute shadow-md'>
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


    <div  ref={editRef}  className={` fixed inset-0 bg-black bg-opacity-25  flex justify-center items-center
                ${openEdit ? '':' hidden'}`}>
                    <div className='w-[600px] flex flex-col'>
                    <button className="text-white text-xl place-self-end" onClick={() => onClose()}>x</button>
                    <div className="bg-white p-2 rounded">
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
            <div onClick={() => setOpenEdit(!openEdit)}>
                <button onClick={showSidebar}>キャンセル</button>
            </div>
            <div onClick={() => setOpenEdit(!openEdit)}>
                <button type='button' onClick={() =>{submitEdit(commentField.id)}}> 編集
                </button>
            </div>
        </div>
                    </div>
                    </div>

    </div>

        <div className={`
            ${openDelete ? 'fixed inset-0 bg-black bg-opacity-25  flex justify-center items-center':' hidden'}`}>

                <div className='w-[600px] flex flex-col'>
                <button className="text-white text-xl place-self-end" onClick={() => onClose()}>x</button>
                <div className="bg-white p-2 rounded">
                    <p>コメントの削除</p>
                    <p>コメントを完全に削除しますか？</p>
                    <div onClick={() => setOpenDelete(!openDelete)}>
                        <button onClick={showSidebar}>キャンセル</button>
                    </div>
                    <div onClick={showSidebar}>
                    <button type="button" className="btn"
                    onClick={()=>{deleteComment(commentField.id)}}>
                        削除
                    </button>
                </div>
                </div>

            </div>

        </div>

     </>
        :''}
  </div>

</>
:''
}
</div>
</div>
))}

</div>
    </>
  )
}

export default Comments

