import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import { useStateValue } from '../StateProvider';
import * as AiIcons from 'react-icons/ai';
import CurrencyFormat from 'react-currency-format'
import './FavoritesItems.css'
import { Link } from 'react-router-dom';

function FavoritesItems({ id, title, price, img }) {

    const [ { user } ] = useStateValue();

    const addToBasket = () => {
        const userbasketItem = db.collection('basketItems').doc(`${user?.uid}`);

        userbasketItem.get()
        .then((doc) => {
            console.log(doc);
            if(doc.exists){
                const BasketItem = db.collection('basketItems').doc(`${user?.uid}`).collection('basket').doc(`${id}`);
                BasketItem.get()
                .then((docu) => {
                    if(docu.exists){
                        BasketItem.update({
                            quantity: docu.data().quantity + 1
                        }); console.log("YA EXISTEEEEE")
                    } else{
                        db.collection('basketItems').doc(`${user?.uid}`).collection('basket').doc(`${id}`).set({
                            title: title,
                            img: img,
                            price: price,
                            quantity: 1
                        }); console.log("NO EXISTE RECIEN CREADOOOO")
                    }
                })
            } else{
                db.collection('basketItems').doc(`${user?.uid}`).set({temp: 1})
                db.collection("basketItems").doc(`${user?.uid}`).collection('basket').doc(`${id}`).set({
                    title: title,
                    img: img,
                    price: price,
                    quantity: 1
                })
            }
        })
    }

    const addToFav = () => {
        const FavItem = db.collection('basketItems').doc(`${user?.uid}`).collection('favs').doc(`${id}`);
        FavItem.get()
        .then(
            FavItem.delete()
        )
    }

    return (
        <div className='favItems'>
            <div className="favItems__container">
                <Link to={`/productInfo/${id}`} className='favItems__Link'> 

                    <div className="favItems__img">
                        <img src={img} />
                    </div>

                    <div className="favItems__info">

                        <div className="favItems__title">

                            <div className="favItems__name">
                                <p>{title}</p>
                            </div>


                            <CurrencyFormat
                                renderText={(value) => (
                                    <>
                                        <strong className="favItems__price">{value}</strong>
                                    </>

                                )}
                                decimalScale={2}
                                value={price}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'$'}
                            />


                        </div>

                    </div>

                </Link>

                <div className="favItems__add">
                    <div className="favItems__addContainer">
                        <button className='favItems__btn' onClick={addToBasket}> Agregar al Carrito </button>
                            
                        <div className="favItems__sendFav" onClick={addToFav}> <p> <AiIcons.AiFillHeart /> </p> </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default FavoritesItems
