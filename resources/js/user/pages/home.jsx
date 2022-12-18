import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";


function home() {
    const [posts, setPosts] = useState([]);

    useEffect(() =>{
        fetchAllPost();
    },[]);

    const fetchAllPost = async() =>{
        await axios.get('/post').then(res=>{
            setPosts(res.data);
        })
    }
    function renderElement(){
        if(posts){
            return <div className=' w-h h-screen auto-mt'>
                <div className=" container  max-w-4xl mx-auto p-0 sm:py-36 px-2" >
                    <div className='pt-3 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6'>


                {posts.map((posts, i)=>(


                    <div  key={i}>
                    <Link to={{ pathname :"/view/"+posts.id }}>

        <div className='shadow-lg rounded-lg'>
        <img src={ "http://127.0.0.1:5173/storage/app/public/images/" +posts.photo}  alt={posts.photo}  className='rounded-t-lg' />

          <div className='p-5'>
            <h3 className='text-3xl font-bold text-slate-700 mb-3'>{ posts.title}</h3>
            <p className='text-lg font-normal text-gray-600 truncate'>{ posts.body}</p>
          </div>
        </div>

      </Link>
    </div>
        ))}
            </div>
            </div>
            </div>

        }else{
            return <p>Loading.....</p>
        }

    }

    return (
    <div>


{ renderElement() }
    </div>
    )
}

export default home
