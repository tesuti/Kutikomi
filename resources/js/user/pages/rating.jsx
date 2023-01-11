import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { FaStar } from 'react-icons/fa';

function rating() {
    const [posts, setPosts] = useState([]);
    const [visible, setVisible] = useState(10);

    const MorePosts= () =>{
        setVisible((visible) => visible + 4);
    }

    useEffect(() =>{
        fetchAllPost();
    },[]);

    const fetchAllPost = async() =>{
        await axios.get('/comment').then(res=>{
            setPosts(res.data);
        })
    }

    return (
        <div className=' w-h  auto-mt'>
        <div className=" container  max-w-4xl mx-auto p-0 py-36 px-2">
        <div className='grid  grid-cols-1 gap-6 pt-8'>

       {posts.slice(0,visible).map((posts, i)=>(
          <Link to={{ pathname :"/sa/view/"+posts.posts.id }} key={i}>
            <div className='sm:flex mb-7 bg-white rounded-lg shadow-inner '>
                    <p className='p-3'>{++i}</p>
                    <img  className='object-cover sm:w-3/12 '  src={ "http://127.0.0.1:5173/storage/app/public/images/" +posts.posts.photo} alt={posts.posts.photo} />

                <div className='p-5 truncate'>

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
                                color={ratingValue <= (posts.comment_avg) ? "#ffc107" : "#e4e5e9"}
                                size={20}
                                />
                            </label>
                    )
                })}
                　{ posts.comment_avg}
                <h3 className='text-xl text-slate-700 mb-3 truncate'>{ posts.posts.title}</h3>
                <h3 className='text-xl text-slate-700 truncate'>{ posts.posts.body}</h3>
                </div>
                </div>
            </Link>


          ))}
        </div>
        <div className='py-3'>
            <button className='py-2.5 px-5 rounded bg-slate-200 text-zinc-700' onClick={MorePosts}>表示</button>
        </div>
      </div>
      </div>
    )
}

export default rating
