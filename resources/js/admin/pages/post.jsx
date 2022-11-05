import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Post() {
    const vaigate = useNavigate();
    const [title, setTitle] = useState("");
    const [body,setBody] = useState("");

    const data = {
        title: title,
        body: body,
    };

    const submitForm = (e) =>{
        e.preventDefault();
        axios.post('/post',data).then((res)=>{
            vaigate('/admin');
        })
    }


  return (
    <div>
    <h2>記事を作成</h2>
    <label>タイトル</label>
    <input type="text" name='title' className=''
    value={title || ''}
    onChange={(e) => setTitle(e.target.value)}
    />

    <label>内容</label>
    <input type="text" name='body' className=''
    value={body || ''}
    onChange={(e) => setBody(e.target.value)}
    />

    <button type='button' onClick={submitForm}>登録</button>
</div>
  )
}

export default Post
