import React from 'react'
import './CheckoutProduct.css'
import StarRateIcon from '@material-ui/icons/StarRate';
import { useStateValue } from './StateProvider';
import CurrencyFormat from 'react-currency-format';
import { db } from './firebase';
import { fadeIn } from 'react-bootstrap'
import { Link } from 'react-router-dom';

function CheckoutProduct( {id, item} ) {

    const [ { user } ] = useStateValue();

    const removeFromBasket = (e) => {
        e.preventDefault();

        document.getElementById('product').className = 'deleteProduct';

        setTimeout(() => {
            db.collection('basketItems').doc(`${user?.uid}`).collection('basket').doc(`${id}`).delete();
            document.getElementById('product').className = 'a';
        }, 500);
    }

    let options = [];

    for(let i=1; i<Math.max(item?.quantity+1, 20); i++){
        options.push(<option value={i}> Qty: {i} </option>)
    }

    const changeQuantity = (newQuantity) => {
        db.collection('basketItems').doc(`${user?.uid}`).collection('basket').doc(`${id}`).update({
            quantity: parseInt(newQuantity)
        })
    };

    return (
        <div id='product' className='checkoutProduct'>
            <div className="checkoutProduct__container">
                <Link to={`/productInfo/${id}`} className='checkoutProduct__link'>
                    <img className='checkoutProduct__img' src={ item?.img } />
                </Link>
                
                <div className='checkoutProduct__info'>
                    <div className="checkoutProduct__infoValue">
                        <p className='checkoutProduct__title'> { item?.title } </p>

                        <CurrencyFormat className='checkoutProduct__price'
                            renderText={(value) => (
                                <>
                                    <strong className='checkoutProduct__priceTitle'> {value} </strong>
                                </>
                            )}
                            decimalScale={2}
                            value={item?.price}
                            displayType={'text'}
                            thousandSeparator={true}
                            prefix={'$'}
                        />
                    </div>

                    <p className='checkoutProduct__quantity'>
                        <select value={item?.quantity} onChange={ (e)=>changeQuantity(e.target.value) }>
                            {options}
                        </select>
                    </p>

                    <button onClick={removeFromBasket} className='algo'> Eliminar </button>
                </div>
            </div>

        </div>
    )
}

export default CheckoutProduct
