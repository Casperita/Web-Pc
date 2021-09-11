import React, { useState, useEffect } from 'react'
import './Cupon.css';
import * as AiIcons from 'react-icons/ai';
import { useStateValue } from '../StateProvider';

function Cupon() {

    const [ state, dispatch ] = useStateValue(); 

    const [cupon, setCupon] = useState(false);

    const HandleDiscount = (e) => {
        let tempDiscount = parseFloat(e.target.id, 10);
        dispatch({ type: 'SET_CUPON', data: tempDiscount })
        setCupon(!cupon);
        console.log("cupon:", tempDiscount)
    }

    return {
        render: (
        <div>

            {cupon
            ? (<div className='cupon'>
                    <div className='cupon__container'>
                        <h3>Cupones</h3>
                        <div className="cupon__row">
                            <div className="cupon__rowIndiv">
                                
                               <img src="cupon.png" id='0.4' 
                                onClick={(e) => HandleDiscount(e)} />
                            <h3> Descuento para los primeros en usar esta PaginaCanchera </h3>
                            </div>
                            
                        </div>
                        <button onClick={() => setCupon(!cupon)}>Cancelar</button>
                    </div>
                </div>)

            : (<div className='cupon__btn'>
                    <button onClick={() => setCupon(!cupon)}>
                        <AiIcons.AiOutlinePercentage className='checkout__de_cupon_icon'/>
                        <p>Agregar Cupon</p>
                    </button>
                </div>)}
            
        </div>
        
    )}
}

export default Cupon
