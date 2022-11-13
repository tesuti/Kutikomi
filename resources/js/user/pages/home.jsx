import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";

function home() {
    const [posts, setPosts] = useState([]);
    const [commentField, setCommentField] = useState([]);

    useEffect(() =>{
        fetchAllPost();
        fetchAllComment();
    },[]);

    const fetchAllPost = async() =>{
        await axios.get('/post').then(res=>{
            setPosts(res.data);
        })
    }
    const fetchAllComment = async() =>{
        await axios.get('/comment').then(res=>{
            setCommentField(res.data);
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
{/* {commentField.map((comment,i)=>(
<>
{++i}
<input type="text" />
<p>{ comment.post_id}</p>
        </>
        ))} */}
    </div>
    )
}

export default home
