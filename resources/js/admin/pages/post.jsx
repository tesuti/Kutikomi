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

    const submitForm = async(e) =>{
        e.preventDefault();
        if(title.length==0||body.length==0){
            setError(true)
        }
        await axios.post('/post',data,{
            headers: {
                'content-type': 'multipart/form-data',
            },
        }).then((res)=>{
            vaigate('/admin');
        })
    }


return (
<div className='  w-h h-screen auto-mt'>
    <div className='container max-w-4xl mx-auto p-0 sm:py-36 px-2 mt-5 w-screen flex justify-center items-center'>
        <div className=' bg-white p-4 rounded md:w-[500px]'>
            <div>
                <h2>記事を作成</h2>
                <label>タイトル</label>
                <input type="text" name='title' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                value={title || ''}
                onChange={(e) => setTitle(e.target.value)}
                />
                {error&&title.length<=0?
                    <p className='text-red-700'>入力してくさい</p>:""
                }
                <label>内容</label>
                <textarea  type="text" name='body' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                value={body || ''}
                onChange={(e) => setBody(e.target.value)}
                />
                {error&&title.length<=0?
                    <p className='text-red-700'>入力してくさい</p>:""
                }
                <label className='py-4'  htmlFor="images">画像</label>
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
                </div>
            <button type='button' className="text-white bg-blue-700 hover:bg-blue-800 focus:ring- focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"  onClick={submitForm}>登録</button>
            </div>
        </div>
    </div>

)
}

export default Post
