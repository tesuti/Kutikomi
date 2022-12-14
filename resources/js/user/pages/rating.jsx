import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";


function rating() {
    const [posts, setPosts] = useState([]);

    useEffect(() =>{
        fetchAllPost();
    },[]);

    const fetchAllPost = async() =>{
        await axios.get('/comment').then(res=>{
            setPosts(res.data);
        })
    }

    return (
        <div className=" container  max-w-4xl mx-auto p-0 py-36 px-2">
        <div className='grid  grid-cols-1 gap-6 pt-8'>

       {posts.map((posts, i)=>(
          <Link to={{ pathname :"/view/"+posts.posts.id }} key={i}>
            <div className='sm:flex mt-7 bg-white rounded-lg shadow-inner '>
                    <p className='p-3'>{++i}</p>
                    <img  className='object-cover sm:w-3/12 '  src={ "http://127.0.0.1:5173/storage/app/public/images/" +posts.posts.photo} alt={posts.posts.photo} />

                <div className='p-5'>
                    <p>OOOOO</p>
                <p className=' font-normal text-gray-600'>{ posts.comment_avg}</p>
                <h3 className='text-xl text-slate-700 mb-3'>{ posts.posts.title}</h3>
                <h3 className='text-xl text-slate-700 mb-3'>{ posts.posts.body}</h3>
                </div>
                </div>
            </Link>


          ))}
        </div>
      </div>
    )
}

export default rating
