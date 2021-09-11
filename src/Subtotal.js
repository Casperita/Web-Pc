import React from 'react'
import './Subtotal.css'
import CurrencyFormat from 'react-currency-format';
import * as AiIcons from 'react-icons/ai';
import { useStateValue } from './StateProvider';
import { getBasketTotal } from './reducer';
import { Link, useHistory } from "react-router-dom";

function Subtotal( { getSubtotal, getCount } ) {

    return (
        <div className='subtotal'>
            <CurrencyFormat
                renderText={(value) => (
                    <>
                        <p>
                            Subtotal ({getCount()} items): <strong> {value} </strong>
                        </p>
                    </>
                )}
                decimalScale={2}
                value={getSubtotal()}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'$'}
            />

            <Link to='/payment' className='subtotal__pagar'>
                <button>Pagar</button>
            </Link>

        </div>
    )
}

export default Subtotal;
