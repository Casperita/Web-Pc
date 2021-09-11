import React from 'react'
import './SubCategory.css'
import { Link } from 'react-router-dom'

function SubCategory({ category, etiqueta }) {

    return (
        <div className='subCategory'>
            <div className="subCategory__container">

            <Link to={`/search/${category}/${etiqueta}`} className='subCategory__Link'>
                <p> {etiqueta} </p>
            </Link>

            </div>
        </div>
    )
}

export default SubCategory
