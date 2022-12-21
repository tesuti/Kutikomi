import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from 'react-icons/fa';
import './App.css';
import Comments from "./componets/View/Comments";
import Create from "./componets/View/Create";

export default function View(props){

    const [inputs, setInputs] = useState({});
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState("0");

    const [userdetail,setUserdetail] = useState('');

    const [commentField, setCommentField] = useState([]);


    const [hover, setHover] = useState(null);

    const {id} = useParams();

    let total_rating = 0;

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
        <Create />
    </div>

    }
    else{
        return <div>
{/* ログイン画面へ送る */}
        <label>コメント</label>
        <input type="text" name='comment' className=''
        value={comment || ''}
        onChange={(e) => setComment(e.target.value)}
        />
{[...Array(5)].map((star, i) => {
            const ratingValue = i + 1

            return (
            <label key={ratingValue}>
                <input
                type="radio"
                name="rating"
                value={ratingValue}
                onChange={(e) => setRating(e.target.value)}
                />
                <FaStar
                className="star"
                color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}

                size={20}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
                />
            </label>

        );
        })}
        <span>{rating}/5</span>
        <button type='button' onClick={login}>登録</button>
</div>
    }
}

    return(
        // 画像と評価の平均値を表示
        <section className=" w-h auto-mt">
            <div className=" container  max-w-4xl mx-auto p-0 sm:py-36 px-2" >
        <div className="">
        <img src={ "http://127.0.0.1:5173/storage/app/public/images/" +inputs.photo}  alt={inputs.photo} className="className='rounded-t-lg object-cover sm:w-full pt-6  "/>
        <section className="flex justify-between py-5">
            <div>
                <p>{ inputs.title }</p>

            </div>
            <div>
        {commentField.reduce((total,commentFields,total_comment)=>{
        total_rating += commentFields.rating;
        {++total_comment}

        //星の平均値
        const average= total_rating / total_comment;

    return(
        <section>
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
        </section>
    );
    },0)}
    </div>
</section>
<p className="break-all pb-5">{ inputs.body }</p>


        </div>

        {/* 投稿フォーム */}
        { renderElement() }

    <div>

    <div>
    <Comments/>
</div>

    </div>
    </div>
    </section>

    )
}
