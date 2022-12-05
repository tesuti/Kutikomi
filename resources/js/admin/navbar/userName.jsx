
import { useEffect, useState } from 'react';

const userName = () => {
    const [userdetail, setUserdetail] = useState('');

    useEffect(() =>{
        fetchUserDetail();
    },[]);

    const fetchUserDetail = () =>{
        axios.get('/me').then((res)=>{
            setUserdetail(res.data);
    });
}
    function renderElement(){
        if(userdetail){
            return <>
            <div >
                <p className='bg-red-200 p-3 rounded-full'>{userdetail.name[0]}</p>
            {/* <div className={!nav ? 'hidden' : ''}>
            <ul>
                <li>
                <span role="button" className="" onClick={logoutUser}>Logout</span>
                </li>
            </ul>
            </div> */}
            </div>

            </>
        }else{
            return <p>未ログイン</p>
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
