import axios from "axios";
import { comment } from "postcss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from 'react-icons/fa';

export default function View(props){

    const [inputs, setInputs] = useState({});
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState("");
    const [commentField, setCommentField] = useState([]);
    const {id} = useParams();
    const data = {
        comment: comment,
        rating: rating,
        id:id,
    };
    const submitForm = (e)=>{
        e.preventDefault();
        axios.post('/comment',data).then((res)=>{
        })
    }

    useEffect(() =>{
        fetchPost();
        fetchComment();
    },[]);

    const fetchPost = () =>{
        axios.get('/post/' +id+ '/edit').then((res)=>{
            setInputs({
                title:res.data.title,
                body:res.data.body,
            });
        });
    }
    const fetchComment = () =>{
        axios.get('/comment/'+ id).then((res)=>{

            setCommentField(
                res.data
            );
            console.log(co);
        });
    }

    return(
        <div>
            <section className="pt-12 sm:pt-20 text-black">
                <p>{ inputs.title }</p>
                <p>{ inputs.body }</p>
            </section>

        <div>
        <h2>記事を作成</h2>
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

        <div>

        <div>
        {commentField.map((commentField)=>(
            <div key={commentField.id}>
                <p>{ commentField.user.name}</p>
                <p>{ commentField.rating}</p>
                <p>{ commentField.comment}</p>

                <p>------</p>
            </div>
        ))}
    </div>




        </div>
        </div>
    )
}
