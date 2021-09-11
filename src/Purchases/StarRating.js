import React, { useState } from 'react'
import * as AiIcons from 'react-icons/ai';
import './StarRating.css'

function StarRating() {

    const [count, setCount] = useState(0)


    function Rate(e) {
        
        let index = e.target.id;

        if(count <= index){
            for(let i=1; i<=index; i++){
                const doc = document.getElementById(`${i}`)
                setCount(i)

                doc.innerHTML = "⭐"
            }
        } else if(count > index){
            for(let i=5; i>index; i--){
                const doc = document.getElementById(`${i}`)
                setCount(i-1)

                doc.innerHTML = "✰"
            }
        }

    }

    return {
    count,
    render: (
        <div className='star__rating'>
            <p onClick={(e) => Rate(e)} id={1} className='star' > ✰ </p>
            <p onClick={(e) => Rate(e)} id={2} className='star'> ✰ </p>
            <p onClick={(e) => Rate(e)} id={3} className='star'> ✰ </p>
            <p onClick={(e) => Rate(e)} id={4} className='star'> ✰ </p>
            <p onClick={(e) => Rate(e)} id={5} className='star'> ✰ </p>
            
        </div>
    )
}}

export default StarRating
