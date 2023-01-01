import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import { HiOutlinePhoto } from "react-icons/hi2";

function edit() {
    const vaigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState("");
    const [body,setBody] = useState("");
    const [photo,setPhoto] = useState({
        file:[],
        filepreview:null,
        });
    const [error,setError]=useState(false);
    const [inputs, setInputs] = useState({});
    const {id} = useParams();

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
    <div className='  w-h  auto-mt'>
        <div className='container max-w-4xl mx-auto p-0 sm:py-36 px-2'>
            <div className='m-auto max-w-lg'>
            {inputs.photo != null ?<>
                <img src={ "http://127.0.0.1:5173/storage/app/public/images/" +inputs.photo}  alt={inputs.photo} className="rounded-t-lg object-cover pt-6 sm:w-full"  />
                <div className='pt-4'>
                    <p>{ inputs.title }</p>
                    <p>{ inputs.body }</p>
                </div>
                </>:<div className="animate-pulse">
        <div className=" bg-slate-700 pb-[57%] mt-6">　</div>
        <div class="flex-1 space-y-6 py-1">
      <div class="space-y-3 pt-4 ">
        <div class="grid grid-cols-3 gap-4">
          <div class="h-2 mb-4 bg-slate-700 rounded col-span-2"></div>
          <div class="h-2 bg-slate-700 rounded col-span-1"></div>
        </div>
      </div>
    </div>

        </div>
        }
            <div>
                <div className='pt-3'>
                <div className=' bg-white p-4 rounded md:w-[500px]'>
                    <div>
                        <label>タイトル</label>
                        <input type="text" name='title' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                        value={title || ''}
                        onChange={(e) => setTitle(e.target.value)}
                        />
                        <label>内容</label>
                        <textarea  type="text" name='body' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                        value={body || ''}
                        onChange={(e) => setBody(e.target.value)}
                        />
                        <label className='pt-4 pb-2'  htmlFor="images">画像</label>
                        <div className='flex  mb-3'>
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
                            : <div className=" relative bg-slate-700 pb-[57%] mb-3"></div>}
                    </div>
                        <button type='button' className="text-white bg-blue-700 hover:bg-blue-800 focus:ring- focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={submitEdit}>編集</button>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>
    )
}

export default edit
