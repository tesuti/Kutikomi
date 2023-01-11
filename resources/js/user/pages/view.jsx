import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from 'react-icons/fa';
import './App.css';
import Comments from "./componets/View/Comments";
import Create from "./componets/View/Create";


export default function View(){

    const [inputs, setInputs] = useState({});

    const [userdetail,setUserdetail] = useState('');

    const [commentField, setCommentField] = useState([]);

    const {id} = useParams();

    let total_rating = 0;

    useEffect(() =>{
        fetchUserDetail();
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



    const fetchUserDetail = () =>{
        axios.get('/me').then((res)=>{
            setUserdetail(res.data);
    });
}

const login = () =>{
    window.location.replace("/login")
}


    return(
        // 画像と評価の平均値を表示
        <section className=" w-h auto-mt">
            <div className=" container  max-w-4xl mx-auto p-0 sm:py-36 px-2" >
        <div>
            {inputs.photo != null ?<>
        <img src={ "http://127.0.0.1:5173/storage/app/public/images/" +inputs.photo}  alt={inputs.photo} className="rounded-t-lg object-cover sm:w-full pt-6"/>
        <section className="pt-4">
            <div>
                <p className="break-all whitespace-pre-wrap ">{ inputs.title }</p>

            </div>
            <div>
        {commentField.reduce((total,commentFields,total_comment)=>{
        total_rating += commentFields.rating;
        {++total_comment}

        //星の平均値
        const average= total_rating / total_comment;

    return(
        <section className="py-3 text-right ">
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
        　({total_comment})
        </section>
    );
    },0)}
    </div>
</section>
<p className="break-all pb-8 whitespace-pre-wrap" >{ inputs.body }</p>
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

        {/* ログイン画面へ */}
        {userdetail ? <Create /> : <div>
        <button  className='px-5 py-2.5 mb-7 text-center bg-slate-200  hover:bg-slate-300 rounded' onClick={login}>コメント</button>
        </div>     }

    <div>

    <div>
    <Comments/>
</div>

    </div>
    </div>
    </section>

    )
}
