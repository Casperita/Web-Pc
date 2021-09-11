import React, { useEffect, useState } from 'react'
import CurrencyFormat from 'react-currency-format'
import { db, storage } from '../firebase';
import * as AiIcons from 'react-icons/ai';
import './SearchedProducts.css'
import { useStateValue } from '../StateProvider';
import { Link } from 'react-router-dom';

function SearchedProducts({ id, img, title, price, rate }) {

    const [favorites, setFavorites] = useState(false);

    const [ { user } ] = useStateValue();

    const getFavs = () => {
        db.collection('basketItems').doc(`${user?.uid}`).collection('favs').doc(`${id}`).get()
        .then((docu) => {
            if (docu.exists){
                setFavorites(true)
            } else {
                setFavorites(false)
            }
        })
    }

    function getStars() {
        let tempStars = [ "✰", "✰", "✰", "✰", "✰"];
        let i;

        if(rate == undefined){
            return(<p>{tempStars}</p>)
        } else {
            for(i=0; i<rate; i++){
                tempStars[i] = "⭐"
            }
            return(<p>{tempStars}</p>)
        }
    }

    useEffect(() => {
        getFavs()
    }, [user])

    const addToBasket = () => {
        const userbasketItem = db.collection('basketItems').doc(`${user?.uid}`);

        if(user){
            userbasketItem.get()
            .then((doc) => {
                if(doc.exists){
                    const BasketItem = db.collection('basketItems').doc(`${user?.uid}`).collection('basket').doc(`${id}`);
                    BasketItem.get()
                    .then((docu) => {
                        if(docu.exists){
                            BasketItem.update({
                                quantity: docu.data().quantity + 1
                            });
                        } else{
                            db.collection('basketItems').doc(`${user?.uid}`).collection('basket').doc(`${id}`).set({
                                title: title,
                                img: img,
                                price: price,
                                quantity: 1
                            });
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
        } else {
            alert("Inicie sesion para agregar Productos")
        }
    }

    const addToFav = () => {
        if(user){
            const FavItem = db.collection('basketItems').doc(`${user?.uid}`).collection('favs').doc(`${id}`);
            FavItem.get()
            .then((docu) => {
                if(docu.exists){
                    FavItem.delete()
                    .then(setFavorites(false))
                } else {
                    FavItem.set({
                        title: title,
                        img: img,
                        price: price
                    })
                    .then(setFavorites(true))
                }
            })
        } else{
            alert("Debe iniciar sesion para realizarlo")
        }
    }


    return (
        <div className='search'>
            <div className="search__container">
                <Link to={`/productInfo/${id}`} className='search__Link'> 

                    <div className="search__img">
                        <img src={img} />
                    </div>

                    <div className="search__info">

                        <div className="search__title">

                            <h3>{title}</h3>

                            <div className="search__titlePrice">
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <>
                                            <p><strong>{value}</strong></p>
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

                        <div className="search__rate">
                            {getStars()}
                        </div>

                    </div>
                </Link>
                <div className="search__send">
                    <div className="search__sendContainer">

                        <button className='search__btn' onClick={addToBasket}> Agregar al Carrito </button>
                        {favorites
                        ? (<div className="search__sendFav" onClick={addToFav}> <p> <AiIcons.AiFillHeart /> </p> </div>)
                        : (<div className="search__sendFav" onClick={addToFav}> <p> <AiIcons.AiOutlineHeart /> </p> </div>)}
                        
                    </div>
                </div>

            </div>



            </div>
    )
}

export default SearchedProducts
