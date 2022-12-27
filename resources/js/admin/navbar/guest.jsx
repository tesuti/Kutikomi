import React from 'react';

function Guest() {

    const admin = () =>{
        window.location.replace("/admin/login")
    }

    return (
        <>

    <ul className="hidden md:flex ">
    <div className='z-40 fixed inset-0  bg-opacity-25  flex justify-center items-center'>
            <div className=''>
                <div className="bg-white p-2 rounded">

                    <div className='flex justify-center items-center gap-4'>

                        <div>
                            <button type="button" className=' text-white bg-red-700 hover:bg-red-800 focus:ring- focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                            onClick={admin}>
                            S/A管理者
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </ul>
    </>
    );
}

export default Guest;

