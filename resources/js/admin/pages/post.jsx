import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HiOutlinePhoto } from "react-icons/hi2";

function Post() {
    const vaigate = useNavigate();
    const [title, setTitle] = useState("");
    const [body,setBody] = useState("");
    const [photo,setPhoto] = useState({
        file:[],
        filepreview:null,
        });
    const [error,setError]=useState(false);

    const handleInputChange = (e) => {
        setPhoto({
            ...photo,
            file:e.target.files[0],
            filepreview:URL.createObjectURL(e.target.files[0]),
        });
        }

    const data = {
        title: title,
        body: body,
        photo:photo.file,
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
        <div className=' bg-white md:p-4 rounded md:w-[500px]'>
            <div>
                <h2 className='mb-3'>記事を作成</h2>
                <label>タイトル</label>
                <input type="text" name='title' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                value={title || ''}
                onChange={(e) => setTitle(e.target.value)}
                />
                {error&&title.length<=0?
                    <p className='text-red-700'>入力してくさい</p>:""
                }
                {error&&title.length>=256?
                    <p className='text-red-700'>255文字まで</p>:""
                }
                <label>内容</label>
                <textarea  type="text" name='body' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                value={body || ''}
                onChange={(e) => setBody(e.target.value)}
                />
                {error&&body.length>=256?
                    <p className='text-red-700'>255文字まで</p>:""
                }
                {error&&body.length==0?
                    <p className='text-red-700'>入力して下さい</p>:""
                }
                <label className='py-4'  htmlFor="images">画像</label>
                {error&&photo.filepreview === null?
                    <p className='text-red-700'>画像が見つかりません</p>:""
                }
                <div>
                    <input
                        accept="image/* .png .jpg .jpeg"
                        multiple
                        type="file"
                        id='photo'
                        name="photo"
                        className='hidden'
                        onChange={handleInputChange}
                    />
                    <label htmlFor="photo" className='text-4xl'><HiOutlinePhoto /></label>
                    </div>
                    {photo.filepreview !== null ?
                        <img className="pb-3"  src={photo.filepreview} alt="UploadImage" />
                    : <div className=" bg-slate-700 pb-[57%] mb-3"></div>
                    }
                </div>
            <button type='button' className="text-white bg-blue-700 hover:bg-blue-800 focus:ring- focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"  onClick={submitForm}>登録</button>
            </div>
        </div>
    </div>

)
}

export default Post
