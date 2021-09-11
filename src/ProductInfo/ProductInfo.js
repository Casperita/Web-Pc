import React, { useEffect, useState } from 'react'
import CurrencyFormat from 'react-currency-format';
import { useParams } from 'react-router-dom'
import { db, auth } from '../firebase';
import { useStateValue } from '../StateProvider';
import * as AiIcons from 'react-icons/ai';
import './ProductInfo.css'
import Questions from './Questions';
import Opinions from './Opinions';

function ProductInfo() {

    let { productId } = useParams();

    const [product, setProduct] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [userQuestion, setUserQuestion] = useState('');
    const [opinions, setOpinions] = useState([])
    const [favorites, setFavorites] = useState(false);

    const [ { user } ] = useStateValue();

    const addToBasket = () => {
        const userbasketItem = db.collection('basketItems').doc(`${user?.uid}`);
        userbasketItem.get()
        .then((doc) => {
            console.log(doc);
            if(doc.exists){
                const BasketItem = db.collection('basketItems').doc(`${user?.uid}`).collection('basket').doc(`${productId}`);
                BasketItem.get()
                .then((docu) => {
                    if(docu.exists){
                        BasketItem.update({
                            quantity: docu.data().quantity + 1
                        }); console.log("YA EXISTEEEEE")
                    } else{
                        db.collection('basketItems').doc(`${user?.uid}`).collection('basket').doc(`${productId}`).set({
                            title: product?.title,
                            img: product?.img,
                            price: product?.price,
                            quantity: 1
                        }); console.log("NO EXISTE RECIEN CREADOOOO")
                    }
                })
            } else{
                db.collection('basketItems').doc(`${user?.uid}`).set({temp: 1})
                db.collection("basketItems").doc(`${user?.uid}`).collection('basket').doc(`${productId}`).set({
                    title: product?.title,
                    img: product?.img,
                    price: product?.price,
                    quantity: 1
                })
            }
        })
    }

    const addToFav = () => {
        if(user){
            const FavItem = db.collection('basketItems').doc(`${user?.uid}`).collection('favs').doc(`${productId}`);
            FavItem.get()
            .then((docu) => {
                if(docu.exists){
                    FavItem.delete()
                    .then(setFavorites(false))
                } else {
                    FavItem.set({
                        title: product.title,
                        img: product.img,
                        price: product.price
                    })
                    .then(setFavorites(true))
                }
            })
        } else{
            alert("Debe iniciar sesion para realizarlo")
        }
    }

    const onChangeHandler = (e) => {
        const tempQ = e.target.value
        setUserQuestion(tempQ)
    }
    const onSendQuestion = () => {

        var today = new Date();
        var fecha = today.getFullYear()+'-'+( (today.getMonth()+1)<10 ? '0' : '' ) +  (today.getMonth()+1)
        +'-'+ ( today.getDate()<10 ? '0' : '' ) + today.getDate()
        var time = ( (today.getHours()<10 ? '0' : '') + today.getHours() ) + ':' +
        ( today.getMinutes()<10 ? '0' : '' ) + today.getMinutes()
        var dateTime = time + '   ' + fecha;

        const productQuestions = db.collection('products').doc(`${productId}`).collection('questions').doc();
        productQuestions.set({
            userId: user?.displayName,
            content: userQuestion,
            timeDate: dateTime
        })
    }


    const getProductInfo = () => {
        db.collection('products').doc(`${productId}`).get()
        .then((doc) => {
            const tempInfo = doc.data()
            setProduct(tempInfo);
        })

        db.collection('products').doc(`${productId}`).collection('questions').onSnapshot((snapshot) => {
            let tempQuestions = []

            tempQuestions = snapshot.docs.map((doc) => (
                {
                    id: doc.id,
                    info: doc.data()
                }
            ));

            setQuestions(tempQuestions);
        })

        db.collection('products').doc(`${productId}`).collection('opinions').onSnapshot((snapshot) => {
            let tempOpinions = []

            tempOpinions = snapshot.docs.map((doc) => (
                {
                    id: doc.id,
                    info: doc.data()
                }
            ));

            setOpinions(tempOpinions)
        })
    }

    useEffect(() => {
        getProductInfo();
    }, [productId])

    function getStars() {
        let tempStars = [ "✰", "✰", "✰", "✰", "✰"];
        let i;
        if(product.rate == 0){
            return(<p>{tempStars} ({product.rateCount})</p>)
        } else {
            let roundRate = Math.round(product.rate)
            for(i=0; i<roundRate; i++){
                tempStars[i] = "⭐"
            }
            return(<p>{tempStars} ({product.rateCount})</p>)
        }
    }

    const getFavs = () => {
        db.collection('basketItems').doc(`${user?.uid}`).collection('favs').doc(`${productId}`).get()
        .then((docu) => {
            if (docu.exists){
                setFavorites(true)
            } else {
                setFavorites(false)
            }
        })
    }

    useEffect(() => {
        getFavs();
    }, [product])

    return (
        <div className='productInfo'>

            <div className='productInfo__all'>

                <div className="productInfo__container">

                    <div className="productInfo__containerProduct">

                        <div className="productInfo__Left">
                            <img src={product?.img} alt="" />
                        </div>

                        <div className="productInfo__Right">

                            <div className='productInfo__RightValue'>

                                <h3> {product?.title} </h3>

                                <div className="productInfo__rate">
                                    {getStars()}
                                </div>
                                
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <>
                                            <p><strong>{value}</strong></p>
                                        </>
                                    )}
                                    decimalScale={2}
                                    value={product?.price}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    prefix={'$'}
                                />
                            </div>

                            <div className="productInfo__send">
                                <div className="product__sendContainer">

                                    <button className='product__btn' onClick={addToBasket}> Agregar al Carrito </button>
                                    
                                    {favorites
                                    ? (<div className="product__sendFav" onClick={addToFav}> <p> <AiIcons.AiFillHeart /> </p> </div>)
                                    : (<div className="product__sendFav" onClick={addToFav}> <p> <AiIcons.AiOutlineHeart /> </p> </div>)}
                                    
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className='productInfo__description'>
                        <h3>Descripcion</h3>

                        <p>{product?.desc}</p>
                    </div>

                    <div className="productInfo__preguntas">

                        <h3>Hacer una Pregunta</h3>

                        <textarea placeholder='Escribi tu pregunta aca...' onChange={(e) => onChangeHandler(e)} />
                        <button type='button' onClick={onSendQuestion}>Enviar Pregunta</button>

                        <h3> PREGUNTAS </h3>
                        {
                            questions.map((data) => (
                                <Questions
                                id={data.id}
                                userId={data.info.userId}
                                content={data.info.content}
                                timeDate={data.info.timeDate} />
                            ))
                            
                        }
                    </div>

                    <div className="productInfo__opinions">
                        <h3> OPINIONES </h3>
                        {
                            opinions.map((data) => (
                                <Opinions
                                id={data.id}
                                rate={data.info.myRating}
                                userId={data.info.user}
                                opinion={data.info.opinion}
                                />
                            ))
                        }

                    </div>

                </div>

                <div className="productInfo__pago">
                    <h3>Medios de Pago</h3>
                    <p>Mercado Pago</p>
                    <p>MasterCard</p>
                    <p>Visa</p>
                    <p>Sexo</p>
                </div>

            </div>

        </div>
    )
}

export default ProductInfo
