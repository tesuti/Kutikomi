import {  useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from 'react-icons/fa';

const Create = () => {

    const [comment, setComment] = useState("");
    const [rating, setRating] = useState("0");

    const [hover, setHover] = useState(null);

    let [createComment, setCreateComment]= useState(false);

    const {id} = useParams();

    const data = {
        comment: comment,
        rating: rating,
        id:id,
    };

    const submitForm = (e)=>{
        e.preventDefault();
        axios.post('/comment',data).then((res)=>{
        })
    }

  return (
    <>
           <label>コメント</label>
            <input type="text" name='comment' className=''
            value={comment || ''}
            onChange={(e) => setComment(e.target.value)}
            />

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
            <button type='button' onClick={submitForm}>登録</button>
    </>
  )
}

export default Create

