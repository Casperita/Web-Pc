import { Link } from 'react-router-dom';
import React from 'react'
import './Categoria.css'

function Categoria() {
    return (
        <div className='categoria'>


            <div className='categoria__row'>

                <Link to='/all'>
                    <div className='categoria__container'>

                        <img className='categoria__img' src='pcarmada.png'/>
                        <h1 className='categoria__title'> Pc Armadas </h1>

                    </div>
                </Link>

                <Link to='/all'>
                    <div className='categoria__container'>

                        <img className='categoria__img' src='mother.jpg'/>
                        <h1 className='categoria__title'> Motherboard </h1>

                    </div>
                </Link>

                <Link to='/all'>
                    <div className='categoria__container'>

                        <img className='categoria__img' src='ben10.jpg'/>
                        <h1 className='categoria__title'> BEN1 0 </h1>

                    </div>
                </Link>

                <Link to='/all'>
                    <div className='categoria__container'>

                        <img className='categoria__img' src='laptop.jpg'/>
                        <h1 className='categoria__title'> Notbook </h1>

                    </div>
                </Link>



            </div>

            <div className='categoria__row'>

                <Link to='/all'>
                    <div className='categoria__container'>
                        <img className='categoria__img' src='watercool.jpg'/>
                        <h1 className='categoria__title'> Watercooling </h1>
                    </div>
                </Link>

                <Link to='/all'>
                    <div className='categoria__container'>

                        <img className='categoria__img' src='aircool.jpg'/>
                        <h1 className='categoria__title'> Aircooling </h1>

                    </div>
                </Link>

                <Link to='/all'>
                    <div className='categoria__container'>

                        <img className='categoria__img' src='gabinete.png'/>
                        <h1 className='categoria__title'> Gabinete </h1>

                    </div>
                </Link>

                <Link to='/all'>
                    <div className='categoria__container'>

                        <img className='categoria__img' src='ps5.jpg'/>
                        <h1 className='categoria__title'> Consola </h1>

                    </div>
                </Link>


            </div>

        </div>
    )
}

export default Categoria
