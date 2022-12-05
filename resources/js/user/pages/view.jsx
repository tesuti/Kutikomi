import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from 'react-icons/fa';
import './App.css';

export default function View(props){

    const [inputs, setInputs] = useState({});
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState("");

    const [userdetail,setUserdetail] = useState('');

    const [commentField, setCommentField] = useState([]);

    const [editComment, setEditComment] = useState("");
    const [editRating, setEditRating] = useState("");

    const {id} = useParams();

    const data = {
        comment: comment,
        rating: rating,
        id:id,
    };
    const editData = {
        comment: editComment,
        rating: editRating,
        id:id,
    };


    let total_rating = 0;

    const submitForm = (e)=>{
        e.preventDefault();
        axios.post('/comment',data).then((res)=>{
        })
    }
    const submitEdit = (id)=>{
        axios.put('/comment/'+id,editData).then((res)=>{
        })
    }

    useEffect(() =>{
        fetchUserDetail();
        fetchPost();
        fetchComment();
    },[]);

    const fetchPost = async() =>{
        await axios.get('/post/' +id+ '/edit').then((res)=>{
            setInputs({
                title:res.data.title,
                body:res.data.body,
                photo:res.data.photo,
            });
        });
    }

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

const login = () =>{
    window.location.replace("/login")
}

function renderElement(){
    if(userdetail){
return <div>
            <label>コメント</label>
            <input type="text" name='comment' className=''
            value={comment || ''}
            onChange={(e) => setComment(e.target.value)}
            />

            <label>評価</label>
            <input type="text" name='rating' className=''
            value={rating || ''}
            onChange={(e) => setRating(e.target.value)}
            />
            <button type='button' onClick={submitForm}>登録</button>
    </div>

    }
    else{
        return <div>
        <label>コメント</label>
        <input type="text" name='comment' className=''
        value={comment || ''}
        onChange={(e) => setComment(e.target.value)}
        />

        <label>評価</label>
        <input type="text" name='rating' className=''
        value={rating || ''}
        onChange={(e) => setRating(e.target.value)}
        />
        <button type='button' onClick={login}>登録</button>
</div>
    }
}

    return(
        <div>
        <section className="pt-12 sm:pt-20 text-black">
            <p>{ inputs.title }</p>
            <p>{ inputs.body }</p>
            <img src={ "http://127.0.0.1:5173/storage/app/public/images/" +inputs.photo}  alt={inputs.photo} width="200px"/>

        {commentField.reduce((total,commentFields,total_comment)=>{
        total_rating += commentFields.rating;
        {++total_comment}

        //星の平均値
        const average= total_rating / total_comment;

    return(
        <>
        {[...Array(5)].map((star, i) => {

    const ratingValue = i + 1

    return (
    <label key={i}>
        <input
        type="radio"
        name="rating"
        value={ratingValue}
        />
        <FaStar
        className="star"
        color={ratingValue <= (Math.floor(average * 100) / 100)  ? "#ffc107" : "#e4e5e9"}
        size={20}
        />
    </label>
    );

    })}

        <p>平均値：{Math.floor(average * 100) / 100}</p>
        <p>コメント数{total_comment}</p>
        </>
    );
    },0)}

        </section>

        {/* 投稿フォーム */}
        { renderElement() }

    <div>

    <div>
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
</div>




    </div>
    </div>

    )
}
