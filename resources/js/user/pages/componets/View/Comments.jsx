
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
const  Comments = () => {
    const [userdetail,setUserdetail] = useState('');
    const [commentField, setCommentField] = useState([]);

    const [editComment, setEditComment] = useState("");
    const [editRating, setEditRating] = useState("");

    const {id} = useParams();


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
    <button type='button' onClick={() =>{submitEdit(commentField.id)}}>編集</button>
</div>

    <button type="button" className="btn"
    onClick={()=>{deleteComment(commentField.id)}}>
        削除
    </button>
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


