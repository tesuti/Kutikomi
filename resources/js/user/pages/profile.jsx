import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa';
import { LoginUser } from '../../User';


function profile() {
    const [posts, setPosts] = useState([]);
    const [visible, setVisible] = useState(10);
    const userdetail =useContext(LoginUser);
    const MorePosts= () =>{
        setVisible((visible) => visible + 4);
    }

    useEffect(() =>{
        fetchAllPost();
    },[]);

    const fetchAllPost = async() =>{
        await axios.post('/posts').then(res=>{
                setPosts(res.data);
        })
}


    return (
        <div className=' w-h  auto-mt'>
        <div className=" container  max-w-4xl mx-auto p-0 py-36 px-2">
        <div className='grid  grid-cols-1 gap-6 pt-8'>
        <h1>{userdetail.name}</h1>
       {posts.slice(0,visible).map((posts, i)=>(
        <>
        <div  key={i}>
        { userdetail.id == posts.user_id ? <>
        <p>{posts.user_id}</p>
        <p>{posts.title}</p>
        <p>{posts.body}</p>

            </>: ''
    }
    </div>
</>))}

        </div>
        <div className='py-3'>
            <button className='py-2.5 px-5 rounded bg-slate-200 text-zinc-700' onClick={MorePosts}>表示</button>
        </div>
      </div>
      </div>
    )
}

export default profile
