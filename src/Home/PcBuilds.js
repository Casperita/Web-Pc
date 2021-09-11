import React from 'react'
import { Link } from 'react-router-dom';
import './PcBuilds.css'

function PcBuilds() {
    return (
        <div className='builds'>
            <div className="builds__container">

                <Link to='/build' className='builds__block'>
                    <div className='builds__blockContainer'> 
                    <div className='builds__blockTitle'>
                        <div className="builds__blockTitle_container">
                            <h3> Armar Pc </h3>
                        </div>
                    </div>
                        <img className='builds__blockImg' src='armar.jpg' />
                    </div>
                </Link>

                <Link to='/search/pcarmada/Basica' className='builds__block'>
                    <div className='builds__blockContainer'>
                    <div className='builds__blockTitle'>
                        <div className="builds__blockTitle_container">
                            <h3> Gama Baja </h3>
                        </div>
                    </div>
                        <img className='builds__blockImg' src='pcGamerBasica.jpg' />
                    </div>
                </Link>


                <Link to='/search/pcarmada/Media' className='builds__block'>
                    <div className='builds__blockContainer'>
                    <div className='builds__blockTitle'>
                        <div className="builds__blockTitle_container">
                            <h3> Gama Media </h3>
                        </div>
                    </div>
                        <img className='builds__blockImg' src='pcGamerMedia.jpg' />
                    </div>
                </Link>

                <Link to='/search/pcarmada/Alta' className='builds__block'>
                    <div className='builds__blockContainer'>
                        <div className='builds__blockTitle'>
                            <div className="builds__blockTitle_container">
                                <h3> Gama Alta </h3>
                            </div>
                        </div>
                        <img className='builds__blockImg' src='pcGamerAlta.png' />
                    </div>
                </Link>

            </div>
        </div>
    )
}

export default PcBuilds
