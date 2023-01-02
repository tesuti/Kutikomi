import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from 'react-icons/fa';
// import './App.css';
import Comments from "./components/View/comments";

export default function View(props){

    const [inputs, setInputs] = useState({});

    const [commentField, setCommentField] = useState([]);

    const {id} = useParams();

    let total_rating = 0;

    useEffect(() =>{
        fetchPost();
        fetchComment();
    },[]);

    const fetchPost = () =>{
        axios.get('/post/' +id+ '/edit').then((res)=>{
            setTimeout(() =>{
                setInputs({
                    title:res.data.title,
                    body:res.data.body,
                    photo:res.data.photo,
                });
            },250);
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
                <section className=" w-h auto-mt">
            <div className=" container  max-w-4xl mx-auto p-0 sm:py-36 px-2" >
        <div>
        {inputs.photo != null ?<>
        <img src={ "http://127.0.0.1:5173/storage/app/public/images/" +inputs.photo}  alt={inputs.photo} className="rounded-t-lg object-cover sm:w-full pt-6  "/>
        <section className="flex justify-between pt-4">
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
        {/* 5回ループ 星☆☆☆☆☆　*/}
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

        　{Math.floor(average * 100) / 100}
        <p>コメント：{total_comment}</p>
        </section>
    );
    },0)}
    </div>
</section>
<p className="break-all pb-3">{ inputs.body }</p>
</>:<div className="animate-pulse">
        <div className=" bg-slate-700 pb-[57%] mt-6">　</div>
        <div className="flex-1 space-y-6 py-1">
      <div className="space-y-3 pt-4 pb-8">
        <div className="grid grid-cols-3 gap-4">
          <div className="h-2 mb-4 bg-slate-700 rounded col-span-2"></div>
          <div className="h-2 bg-slate-700 rounded col-span-1"></div>
        </div>
        <div className="h-2 bg-slate-700 rounded"></div>
      </div>
    </div>

        </div>
        }
        </div>


    <div>

    <div>
    <Comments/>
</div>

    </div>
    </div>
    </section>

        </div>



    )
}
