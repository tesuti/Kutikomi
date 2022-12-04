import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link} from "react-router-dom";


function home() {
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState("");
    const [body,setBody] = useState("");
    const [photo,setPhoto] = useState();
    const [error,setError]=useState(false);


    const data = {
        title: title,
        body: body,
        photo:photo,
    };

    useEffect(() =>{
        fetchAllPost();
    },[]);

    const fetchAllPost = async() =>{
        await axios.get('/post').then(res=>{
            setPosts(res.data);
        })
    }

    const deletePost= (id) =>{
        axios.delete('/post/'+id).then(res=>{
        })
    }



    function renderElement(){
        if(posts){
            return <div>
                {posts.map((posts, i)=>(
                <div key={i}>
                    <Link to={{ pathname :"view/"+posts.id }}>
                    {++i}
                    { posts.title}
                    <img src={ "http://127.0.0.1:5173/storage/app/public/images/" +posts.photo}  alt={posts.photo} width="200px"/>
                    </Link>
                <div>
                <Link to={{ pathname :"edit/"+posts.id }}>
                    編集
                    </Link>
            <button type="button" className="btn"
            onClick={()=>{deletePost(posts.id)}}>
                削除
            </button>
                </div>
                </div>



        ))}
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
