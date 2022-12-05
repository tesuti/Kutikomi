import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";


function edit() {
    const vaigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState("");
    const [body,setBody] = useState("");
    const [photo,setPhoto] = useState();
    const [error,setError]=useState(false);
    const [inputs, setInputs] = useState({});
    const {id} = useParams();

    const data = {
        title: title,
        body: body,
        photo:photo,
        id:id,
    };

    useEffect(() =>{
        fetchAllPost();
        fetchPost();
    },[]);

    const fetchAllPost = async() =>{
        await axios.get('/post').then(res=>{
            setPosts(res.data);
        })
    }
    const fetchPost = async() =>{
        await axios.get('/post/' +id+ '/edit').then((res)=>{
            setInputs({
                title:res.data.title,
                body:res.data.body,
                photo:res.data.photo,
            });
        });
    }
    const submitEdit = async(e)=>{
        e.preventDefault();
        await axios.post('/post/'+id,data, {
            headers: {
                'content-type': 'multipart/form-data',
                'X-HTTP-Method-Override': 'PUT',
            },
    }).then((res)=>{
            vaigate('/admin');
        })
    }


    return (
    <div>
 <p>{ inputs.title }</p>
            <p>{ inputs.body }</p>
            <img src={ "http://127.0.0.1:5173/storage/app/public/images/" +inputs.photo}  alt={inputs.photo} width="200px"/>

<div>

                <div>
                <div>
    <h2>記事を編集</h2>
    <label>タイトル</label>
    <input type="text" name='title' className=''
    value={title || ''}
    onChange={(e) => setTitle(e.target.value)}
    />



    <label>内容</label>
    <textarea  type="text" name='body' className=''
    value={body || ''}
    onChange={(e) => setBody(e.target.value)}
    />



    <label  htmlFor="images">画像</label>
        <input
            accept="image/* .png .jpg .jpeg"
            multiple
            type="file"
            id='photo'
            name="photo"
            onChange={(e) =>
                setPhoto( e.target.files[0])
                    }
            />
    <button type='button' onClick={submitEdit}>編集</button>

</div>

                </div>




            </div>
    </div>
    )
}

export default edit
