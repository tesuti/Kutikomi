import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

const userName = () => {
    const [userdetail, setUserdetail] = useState('');
    const [open , setOpen] = useState(false);

    const  menuRef =  useRef();
    const imgRef = useRef();

    useEffect(() =>{
        fetchUserDetail();
    },[]);

    const logoutUser = (e)=>{
        e.preventDefault();
        axios.post('/logout').then((res)=>{
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
    function renderElement(){
        if(userdetail){
            return <>
            <button className=' text-white font-[Poppins] rounded md:ml-8 duration-500'>
    <div className=''>
    <p className='bg-red-200 h-10  w-10 rounded-full  cursor-pointer ' ref={imgRef} onClick={() => setOpen(!open)}>A</p>

       </div>
       </button>
       <div className='absolute top-24 right-0 pd-9'>
       {
        open &&(
          <div ref={menuRef} className=' '>
        <div className="bg-white p-4 w-52 shadow-lg  -left-14 top-12">
          <ul>
            <li onClick={() => setOpen(false)} className=
                'p-2 text-lg cursor-pointer rounded hover:bg-blue-100' >
                    <button className="text-gray-800 hover:text-gray-400 duration-500" onClick={logoutUser}>ログアウト</button>
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
