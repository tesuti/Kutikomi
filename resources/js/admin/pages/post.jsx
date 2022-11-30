import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Post() {
    const vaigate = useNavigate();
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


return (
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
)
}

export default Post
