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


    return (
    <div>
        {posts.map((post, i)=>(
                <div key={i}>
                    <Link to={{ pathname :"/view/"+post.posts.id }}>
                    {++i}

                        <p>{ post.title}</p>
                    </Link>
                </div>
        ))}

    </div>
    )
}

export default home
