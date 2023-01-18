import React,{createContext, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import Index from './user/index'
import { BrowserRouter } from 'react-router-dom';
import '../css/app.css'

export const LoginUser = createContext();

function User() {
    const [userdetail,setUserdetail] = useState('');
    useEffect(()=>{
        fetchUserDetail();
    },[]);

    const fetchUserDetail = async() =>{
        await axios.get('/me').then((res)=>{
            setUserdetail(res.data);
        });
    }
    return (
        <LoginUser.Provider value={userdetail}>
        <BrowserRouter>
        <Index />
        </BrowserRouter>
        </LoginUser.Provider>
    );
}

export default User;

if (document.getElementById('user')) {
    ReactDOM.render(<User />, document.getElementById('user'));
}
