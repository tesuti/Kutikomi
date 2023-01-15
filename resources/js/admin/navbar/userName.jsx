import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

const userName = () => {
    const [userdetail, setUserdetail] = useState('');
    const [open , setOpen] = useState(false);

    const  menuRef =  useRef();
    const imgRef = useRef();

    const logoutUser = (e)=>{
        e.preventDefault();
        axios.post('/logout').then((res)=>{
            window.location.reload();
        })
    }

    const register = () =>{
        window.location.replace("/admin/register")
    }

    useEffect(() =>{
        fetchUserDetail();
    },[]);

    const fetchUserDetail = () =>{
        axios.get('/admin/me').then((res)=>{
            setUserdetail(res.data);
    });
}
window.addEventListener('click',(e)=>{
    if(e.target !== menuRef.current && e.target !==  imgRef.current){
        setOpen(false);
    }
  });
    function renderElement(){
        if(userdetail){
            return <>
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
            <li className=''>
                <button
                onClick={register}
                className=" text-lg cursor-pointer rounded hover:bg-blue-100 text-gray-800 hover:text-gray-400 duration-500 pl-2 pr-12 py-2">新規登録
                </button>
            </li>
            <li onClick={() => setOpen(false)} className=
                '' >
                    <button className="text-lg cursor-pointer rounded hover:bg-blue-100 text-gray-800 hover:text-gray-400 duration-500 pl-2 pr-12 py-2" onClick={logoutUser}>ログアウト</button>
            </li>
          </ul>
        </div>
        </div>
      )}
      </div>

            </>
        }else{
            return <p></p>
        }
    }

  return (
    <>
    <span className=''>
        { renderElement() }
    </span>
    </>
  )
}

export default userName
