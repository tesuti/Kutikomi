import axios from 'axios';
import React, { useEffect, useState } from 'react'

function User() {
    const [user, setUser] = useState([]);

    useEffect(() =>{
        fetchAllUser();
    },[]);

    const fetchAllUser = async() =>{
        await axios.get('/user').then(res=>{
            setUser(res.data);
        })
    }

    const deleteUser= (id) =>{
        axios.delete('/user/'+id).then(res=>{
        })
    }

return (
    <div>
     {user.map((user, i)=>(
                <div key={i}>
                    { user.id }
                    { user.name }

                    <button type="button" className="btn"
            onClick={()=>{deleteUser(user.id)}}>
                削除
            </button>
                </div>

        ))}
</div>
)
}

export default User
