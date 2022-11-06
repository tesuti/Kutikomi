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
        {posts.map((posts, i)=>(

                <div key={i}>
                     <Link to={{ pathname :"/view/"+posts.id }}>
                    <p>{++i}</p>
                    <p>{ posts.title}</p>
                    <p>{ posts.body}</p>
                    </Link>
                </div>

        ))}
    </div>
    )
}

export default home
