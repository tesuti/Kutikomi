import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";


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

    const submitForm = (e) =>{
        e.preventDefault();
        if(title.length==0||body.length==0){
            setError(true)
        }
        axios.post('/post',data,{
            headers: {
                'content-type': 'multipart/form-data',
            },
        }).then((res)=>{
            vaigate('/admin');
        })
    }
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
                <div>
    <h2>記事を作成</h2>
    <label>タイトル</label>
    <input type="text" name='title' className=''
    value={title || ''}
    onChange={(e) => setTitle(e.target.value)}
    />

    {error&&title.length<=0?
        <label className='text-red-700'>入力してくさい</label>:""
    }

    <label>内容</label>
    <textarea  type="text" name='body' className=''
    value={body || ''}
    onChange={(e) => setBody(e.target.value)}
    />

    {error&&body.length<=0?
        <label className='text-red-700'  >入力してください</label>:""
    }

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
    <button type='button' onClick={submitForm}>登録</button>

</div>
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
