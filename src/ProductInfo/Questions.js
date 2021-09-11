import React from 'react'
import './Questions.css'

function Questions({ id, userId, content, timeDate }) {
    
    return (
        <div className='questions'>

            <div className="questions__title">
                <strong>{userId}</strong>
                <small>{timeDate}</small>
            </div>

            <p>{content}</p>

        </div>
    )
}

export default Questions
