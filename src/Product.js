import React, { useEffect, useState } from 'react'
import ReactDom from 'react-dom';
import { useSpring, animated, config } from 'react-spring';
import './Product.css'
import { useStateValue } from './StateProvider';
import { db, auth } from './firebase';
import * as AiIcons from 'react-icons/ai';
import { AiFillCodeSandboxCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';


function Product({ id, title, price, img, rate, rateCount }) {

    const [hover, setHover] = useState(false);
    const hoverState = useSpring({
        transform: hover
            ? 'scale(1.05)'  
            : 'scale(1)',
        color: hover
            ? 'white'
            : 'black',
            
        config: config.gentle
    });
    
    const [ { user } ] = useStateValue();

    const [favorites, setFavorites] = useState(false);

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

        if(rate == 0){
            return(<p>{tempStars} ({rateCount})</p>)
        } else {
            let roundRate = Math.round(rate)
            for(i=0; i<roundRate; i++){
                tempStars[i] = "⭐"
            }
            return(<p>{tempStars} ({rateCount})</p>)
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
        
        <div className='product'>
            <div className="product__container">
                <Link className='product__link' to={`/productInfo/${id}`} >

                    <div className="product__info">

                        <div className="product__infoTitle">
                            <p> {title} </p>
                        </div>

                        <div className="product__infoPrice">
                            <CurrencyFormat className='checkoutProduct__price'
                                renderText={(value) => (
                                    <>
                                        <strong className='checkoutProduct__priceTitle'> {value} </strong>
                                    </>
                                )}
                                decimalScale={2}
                                value={price}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'$'}
                            />
                        </div>

                        <div className="product__infoRate">

                            {getStars()}

                        </div>

                    </div>

                    <div className="product__img">
                        <img className="product__imgImage" src={img} />
                    </div>


                </Link>

                <div className="product__send">
                    <div className="product__sendContainer">

                        <button className='product__btn' onClick={addToBasket}> Agregar al Carrito </button>
                        
                        {favorites
                        ? (<div className="product__sendFav" onClick={addToFav}> <p> <AiIcons.AiFillHeart /> </p> </div>)
                        : (<div className="product__sendFav" onClick={addToFav}> <p> <AiIcons.AiOutlineHeart /> </p> </div>)}
                        
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Product;
