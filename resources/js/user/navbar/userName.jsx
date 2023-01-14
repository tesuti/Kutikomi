import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const userName = () => {
    const [userdetail, setUserdetail] = useState('');
    const [open , setOpen] = useState(false);

    const  menuRef =  useRef();
    const imgRef = useRef();

    const navigate = useNavigate();
    
    useEffect(() =>{
        fetchUserDetail();
    },[]);

    const login = () =>{
        window.location.replace("/login")
    }

    const register = () =>{
        window.location.replace("/register")
    }


    const logoutUser = (e)=>{
        e.preventDefault();
        axios.post('/logout').then((res)=>{
            navigate("/");
            window.location.reload();
        })
    }
    const fetchUserDetail = () =>{
        axios.get('/me').then((res)=>{
            setUserdetail(res.data);
    });
}
window.addEventListener('click',(e)=>{
    if(e.target !== menuRef.current && e.target !==  imgRef.current){
        setOpen(false);
    }
  });

  return (
    <>
        {userdetail ? <>
            <button className=' text-white font-[Poppins] rounded md:ml-8 duration-500'>
    <div className=''>
    <p className='bg-red-200 h-10  w-10 rounded-full  cursor-pointer text-3xl' ref={imgRef} onClick={() => setOpen(!open)}>{userdetail.name[0]}</p>

       </div>
       </button>
       <div className='absolute top-24 right-0 pd-9'>
       {
        open &&(
          <div ref={menuRef} >
        <div className="bg-white p-4 w-52 shadow-lg  -left-14 top-12 rounded-lg">
          <ul>
            <li onClick={() => setOpen(false)} className=
                'p-2 text-lg' >
                <p className="text-gray-800 duration-500">{userdetail.name}</p>
            </li>
            <li onClick={() => setOpen(false)} className=
                'p-2 text-lg cursor-pointer rounded hover:bg-blue-100' >
                    <button className="text-gray-800 hover:text-gray-400 duration-500" onClick={logoutUser}>ログアウト</button>
            </li>

          </ul>
        </div>
        </div>
      )}
      </div>
        </> :
        <>
        <div className=' text-white font-[Poppins] rounded md:ml-8 duration-500'>
    <button className='bg-red-200 h-10  w-10 rounded-full  cursor-pointer text-3xl p-3.5' ref={imgRef} onClick={() => setOpen(!open)}></button>
       </div>
       <div className='absolute top-24 right-0 pd-9'>
       {
        open &&(
          <div ref={menuRef} >
        <div className="bg-white p-4 w-52 shadow-lg  -left-14 top-12 rounded-lg">
          <ul>
            <li onClick={() => setOpen(false)} className=
                'p-2 text-lg cursor-pointer rounded hover:bg-blue-100' >
                <button
                onClick={login}
                className="text-gray-800 hover:text-gray-400 duration-500">ログイン
                </button>
            </li>
            <li onClick={() => setOpen(false)} className=
                'p-2 text-lg cursor-pointer rounded hover:bg-blue-100' >
                <button
                    onClick={register}
                    className="text-gray-800 hover:text-gray-400 duration-500">新規登録
                </button>
            </li>
          </ul>
        </div>
        </div>
      )}
      </div>
        </>}

    </>
  )
}

export default userName
