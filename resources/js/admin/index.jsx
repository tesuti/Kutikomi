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
        await axios.get('admin/me').then((res)=>{
            setUserdetail(res.data);
        });
    }
    function renderElement(){
        if(!userdetail){
            return <Guest />
        }else{
            return <Auth />
        }

    }

    return(
        <>
            { renderElement() }
        </>
    )

}

export default Index;

