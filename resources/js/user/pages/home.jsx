import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";


function home() {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState();


    useEffect(() =>{
        fetchAllPost();
    },[]);

    const data = {
        search:search,
    };
    const fetchAllPost = async() =>{
        await axios.post('/post',data).then(res=>{
            setPosts(res.data);
        })
    }
function renderElement(){
if(posts){
    return(
        <div className=' w-h  auto-mt'>
            <div className=" container  max-w-5xl mx-auto p-0 sm:py-36 px-2" >
            <div className='flex pt-3'>
                <input type="text" name='comment' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                placeholder='検索'
                    value={search || ''}
                    onChange={(e) => setSearch(e.target.value)}
                    />
                    <button type='button' className="text-white bg-blue-100 hover:bg-blue-200 focus:ring- focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={fetchAllPost}>🔍</button>
                </div>
                <div className='pt-3 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6'>
                    {posts.map((posts, i)=>(
                        <div  key={i}>
                            <Link to={{ pathname :"/view/"+posts.id }}>
                                <div className='mb-1.5'>
                                    <img src={ "http://127.0.0.1:5173/storage/app/public/images/" +posts.photo}  alt={posts.photo}  className='rounded-xl'/>
                                </div>
                                <div className=''>
                                    <h3 className='text-base home__posts-body break-all  font-normal '>{ posts.title}</h3>
                                    <p className='truncate text-sm font-normal text-gray-600'>{ posts.body}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        )}else{
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
