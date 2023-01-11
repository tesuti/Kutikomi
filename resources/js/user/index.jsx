import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import Guest from "./navbar/guest";
import Auth from "./navbar/auth";
import axios from "axios";

function Index() {
    const [userdetail,setUserdetail] = useState('');

    useEffect(()=>{
        fetchUserDetail();
    },[]);

    const fetchUserDetail = async() =>{
        await axios.get('/me').then((res)=>{
            setUserdetail(res.data);
        });
    }


    return(
        <>
            {!userdetail ? <Guest /> : <Auth />}
        </>
    )

}

export default Index;

