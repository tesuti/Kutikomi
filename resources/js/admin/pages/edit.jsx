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

    const {id} = useParams();

    const data = {
        title: title,
        body: body,
        photo:photo,
        id:id,
    };

    useEffect(() =>{
        fetchAllPost();
    },[]);

    const fetchAllPost = async() =>{
        await axios.get('/post').then(res=>{
            setPosts(res.data);
        })
    }

    const submitEdit = async(e)=>{
        console.log(data);
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


<div>

                <div>
                <div>
    <h2>記事を作成</h2>
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
