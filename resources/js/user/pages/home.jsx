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
    return(
        <div className=' w-h  auto-mt'>
            <div className=" container  max-w-5xl mx-auto p-0 sm:py-36 px-2" >
                <div className='pt-3 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6'>
                    {posts.map((posts, i)=>(
                        <div  key={i}>
                            <Link to={{ pathname :"/view/"+posts.id }}>
                                <div className='mb-1.5'>
                                    <img src={ "http://127.0.0.1:5173/storage/app/public/images/" +posts.photo}  alt={posts.photo}  className='rounded-xl'/>
                                </div>
                                <div className=''>
                                    <h3 className='text-base home__posts-body break-all  font-normal '>{ posts.title}</h3>
                                    <p className='truncate text-sm font-normal text-gray-600'>{ posts.body}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        )}else{
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
