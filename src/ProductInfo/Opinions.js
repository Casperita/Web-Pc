import React from 'react'
import './Opinions.css'
import * as AiIcons from 'react-icons/ai';

function Opinions({ id, rate, userId, opinion }) {

    return (
        <div className='opinions'>

            <div className="opinions__container">

                <strong>{userId}</strong>

                <div className="opinions__title">

                    {Array(rate).fill().map( (_, i) => (
                            <p> <AiIcons.AiFillStar /> </p> 

                    ))}
                </div>

            <p>{opinion}</p>
            
           </div>

        </div>
    )
}

export default Opinions
