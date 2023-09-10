import React, { useState } from 'react'

const Stars = ({color, size, maxRating}) => {
    const [rating, setRating] = useState(0)
    const [HoverRating, setHoverRating] = useState(0)
    let star = <i className='fa fa-star text-gray-200'></i>
    let full = <span className={`text-${color}-600`}><i className={`fa fa-star`}></i></span> 
  return (
    <div className='text-center mt-8 space-x-1 flex flex-row justify-center items-center'>
        {Array.from({length: maxRating}, (_,i) => 
        <span 
            className={`text-${size}`}
            onMouseEnter={() => setHoverRating(i + 1)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => setRating(i + 1)} 
            key={i}
        >
            {HoverRating ? HoverRating >= i + 1 ? full : star : rating >= i + 1 ? full : star}
        </span>)}
        <p className={`font-semibold text-${size} pl-2`}>{HoverRating ? HoverRating : rating}</p>

    </div>
  )
}

function Star(){
    return(
        <div>
            <Stars color={"red"} size={"xl"} maxRating={10}/>
        </div>
    )
}

export default Star