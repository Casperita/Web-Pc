import React from 'react'
import './BuildPc.css'
import {Link, NavLink} from 'react-router-dom'

function BuildPc() {
    return (
        <div className='buildPc'>
            <div className="buildPc__container">

                <h3> Arma tu PC </h3>

                <div className="buildPc__select">

                    <Link to='/buildselect/AMD' className='buildPc__select_Link'>
                        <img src='AMD.png' />
                    </Link>

                    <Link to='/buildselect/Intel' className='buildPc__select_Link'>
                        <img src='Intel.png' />
                    </Link>

                </div>

            </div>
        </div>
    )
}

export default BuildPc
