import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";


function home() {
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
    <div>
        {posts.map((posts, i)=>(
                <div key={i}>
                    <Link to={{ pathname :"/view/"+posts.posts.id }}>
                    {++i}
                    { posts.posts.title}
                    { posts.comment_avg}
                    <img src={ "http://127.0.0.1:5173/storage/app/public/images/" +posts.posts.photo}  alt={posts.posts.photo} width="200px"/>

                    </Link>
                </div>

        ))}

    </div>
    )
}

export default home
