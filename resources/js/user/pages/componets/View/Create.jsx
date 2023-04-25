import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from 'react-icons/fa';

import useOutsideClick from "./useOutsideClick";

const Create = () => {

    const [comment, setComment] = useState("");
    const [rating, setRating] = useState("0");

    const [hover, setHover] = useState(null);

    const [error,setError]=useState(false);

    let [createComment, setCreateComment]= useState(false);
    const {id} = useParams();

    const ref = useRef();

    useOutsideClick(ref, () => {
      if (createComment) setCreateComment(false);
    });

    const data = {
        comment: comment,
        rating: rating,
        id:id,
    };

    const submitForm = (e)=>{
        e.preventDefault();
        if(comment.length==0){
            setError(true)
        }

        axios.post('/comment',data).then((res)=>{
            window.location.reload();
        })
    }

  return (
    <>
    <div className="">
        <button  className='px-5 py-2.5 mb-7 text-center bg-slate-200  hover:bg-slate-300 rounded' onClick={() => setCreateComment(!createComment)}>コメント</button>
    <div ref={ref}  className={`absolute z-30 bg-white p-4 rounded w-[300px] shadow-md
            ${createComment ? '':'hidden'}`}>
        <div  className="my-7">
            <div>
                {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1

                return (
                <label key={ratingValue}>
                    <input
                    type="radio"
                    name="rating"
                    value={ratingValue}
                    onChange={(e) => setRating(e.target.value)}
                    />
                    <FaStar
                    className="star"
                    color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                    size={20}
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(null)}
                    />
                </label>
            );
            })}
            <span>　{rating}/5</span>
        </div>
        <div>
            <p>コメント</p>
            <textarea type="text" name='comment'rows="4" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                value={comment || ''}
                onChange={(e) => setComment(e.target.value)}
                />
                {error&&comment.length>=256?
                    <p className='text-red-700'>255文字まで</p>:""
                }
                {error&&comment.length==0?
                    <p className='text-red-700'>入力して下さい</p>:""
                }
        </div>
    </div>
        <span>
            <button type='button' className="text-white bg-blue-700 hover:bg-blue-800 focus:ring- focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={submitForm}>コメント</button>
        </span>
    </div>
    </div>

    </>
  )
}

export default Create

