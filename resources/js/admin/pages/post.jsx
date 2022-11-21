import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Post() {
    const vaigate = useNavigate();
    const [title, setTitle] = useState("");
    const [body,setBody] = useState("");
    const [photo,setPhoto] = useState();

    const data = {
        title: title,
        body: body,
        photo:photo,
    };

    const submitForm = (e) =>{
        console.log(data);
        e.preventDefault();
        axios.post('/post',data,{
            headers: {
                'content-type': 'multipart/form-data',
            },
        }).then((res)=>{
            vaigate('/admin');
        })
    }
// console.log(photo);
  return (
    <div>
    <h2>記事を作成</h2>
    <form encType="multipart/form-data">
    <label>タイトル</label>
    <input type="text" name='title' className=''
    value={title || ''}
    onChange={(e) => setTitle(e.target.value)}
    />

    <label>内容</label>
    <input  type="text" name='body' className=''
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


    <button type='button' onClick={submitForm}>登録</button>
    </form>
</div>
)
}

export default Post
