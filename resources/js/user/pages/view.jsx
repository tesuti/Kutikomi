import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from 'react-icons/fa';
import './App.css';

export default function View(props){

    const [inputs, setInputs] = useState({});
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState("");

    const [rating_avg, setRating_avg] = useState("");
    const [comment_avg, setComment_avg] = useState("");

    const [commentField, setCommentField] = useState([]);
    const {id} = useParams();
    const data = {
        comment: comment,
        rating: rating,
        id:id,
        comment_avg:comment_avg,
        rating_avg:rating_avg,
    };

    let total_rating = 0;


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
        });

    }

    return(
        <div>
            <section className="pt-12 sm:pt-20 text-black">
                <p>{ inputs.title }</p>
                <p>{ inputs.body }</p>


            {commentField.reduce((total,commentFields,total_comment)=>{
            total_rating+= commentFields.rating;

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
            color={ratingValue <= (Math.ceil(average))  ? "#ffc107" : "#e4e5e9"}
            size={20}
            />
        </label>
        );

        })}

            <p>平均値：{Math.ceil(average)}</p>
            <p>コメント数{total_comment}</p>
            {/* <p>コメント数{commentFields.posts.title}</p> */}
            </>
        );
        },0)}

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
        {commentField.map((commentField,i)=>(

            <div key={commentField.id}>
                <p>{ ++i}</p>
                <p>{ commentField.user.name}</p>
                {/* <p>{ commentField.posts.id}</p> */}
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

                <p>------</p>
            </div>
        ))}
    </div>




        </div>
        </div>
    )
}
