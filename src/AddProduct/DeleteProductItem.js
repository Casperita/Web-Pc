import React from 'react'
import './DeleteProductItem.css'
import CurrencyFormat from 'react-currency-format'
import { db } from '../firebase'

function DeleteProductItem({ id, title, rate, price, img }) {

    const onDeleteItem = () => {
        db.collection('products').doc(`${id}`).delete()
    }

    return (
        <div className='itemDelete'>
            <div className='itemDelete_container'>

                <div className="itemDelete__id">
                    <p> id: {id}</p>
                </div>

                <div className="itemDelete__info">

                    <div className="itemDelete__image">
                        <img src={img} />
                    </div>

                    <div className="itemDelete__title">
                        <p>{title}</p>

                        <CurrencyFormat className='itemDelete__price'
                        renderText={(value) => (
                            <>
                                <strong className='itemDelete__priceTitle'>{value}</strong>
                            </>
                        )}
                        decimalScale={2}
                        value={price}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'$'}
                        />
                    </div>

                    <button className='itemDelete__delete' onClick={onDeleteItem}>Eliminar Item</button>
                    
                </div>
            </div>
        </div>
    )
}

export default DeleteProductItem
