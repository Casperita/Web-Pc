import React, { useState, useEffect } from 'react'
import './Payment.css'
import { db } from '../firebase';
import { Link, useHistory } from 'react-router-dom'
import { useStateValue } from '../StateProvider';
import CheckoutProduct from '../CheckoutProduct';
import CurrencyFormat from 'react-currency-format';

function Payment() {

    const [ { user, cuponDiscount } ] = useStateValue(); 

    const history = useHistory();


    const [userInfo, setUserInfo] = useState([]);
    const [basket, setBasket] = useState([1]);

    const getUserInfo = () => {
        db.collection('basketItems').doc(`${user?.uid}`).get()
        .then((doc) => {
            const tempInfo = doc.data()
            setUserInfo(doc.data())

    })}

    const getBasketItems = () => {
        db.collection('basketItems').doc(`${user?.uid}`).collection('basket').onSnapshot((snapshot) => {
            const tempItems = snapshot.docs.map((doc) => ({
                id: doc.id,
                product: doc.data()
            }))
            
            setBasket(tempItems);
        })

    }

    useEffect(() => {
        getUserInfo();
        getBasketItems();
    }, [user])

    const getCount = () => {
        let count = 0;
        basket.forEach((item) => {
            count += item?.product?.quantity
        })

        return count;
    }

    const getSubtotal = () => {
        let total = 0;
        basket.forEach((item) => {
            total += (item?.product?.price * item?.product?.quantity)
        })
        if(cuponDiscount){
            console.log("TOTAL->", total - (total * cuponDiscount))
            return (total - (total * cuponDiscount))
        } else {
            return total
        }
    }

    const onBuyClick = () => {
        if(userInfo.address1 && userInfo.city1 && userInfo.cp1 && userInfo.dni){
            let itemId = [];

            for(let i=0; i<basket.length; i++) {
                itemId[i] = basket[i].id
                const userPurchases = db.collection('basketItems').doc(`${user?.uid}`).collection('purchases');
                userPurchases.get()
                .then((docu) => {
                    if(docu.exists){
                        userPurchases.doc().update({
                            id: basket[i].id,
                            title: basket[i].product.title,
                            img: basket[i].product.img,
                            price: basket[i].product.price,
                            quantity: basket[i].product.quantity
                        })
                    } else {
                        userPurchases.doc().set({
                            id: basket[i].id,
                            title: basket[i].product.title,
                            img: basket[i].product.img,
                            price: basket[i].product.price,
                            quantity: basket[i].product.quantity
                        })
                    }
                })
                .then(
                    db.collection('basketItems').doc(`${user?.uid}`).collection('basket').doc(`${basket[i].id}`).delete(),
                    history.push('/')
                )
            }
        } else {
            alert("Debe Ingresar los Datos Correspodientes en su Cuenta para Proceder")
        }
    }

    return (
        <div className='payment'>
            <div className="payment__container">

                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Informacion de Envio</h3>
                    </div>
                    <div className="payment__address">

                        <div>
                            <p> { userInfo?.address1 ? userInfo?.address1 : 'Debe Ingresar si Direccion en "Perfil"' } </p>
                            <p> { userInfo?.city1 ? userInfo?.city1 : 'Debe Ingresar su Ciudad en "Perfil"' } </p>
                            <p> { userInfo?.cp1 ? userInfo?.cp1 : 'Debe Ingresar su CP en "Perfil"' } </p>
                        </div> 

                        <div  className='payment__addressEmail'>
                            <p>Nombre { user?.displayName }</p>
                            <p>Email { user?.email }</p>
                            <p>DNI { userInfo?.dni ? userInfo?.dni : ' Debe Ingresar su DNI en "Perfil"' }</p>
                        </div>
                    </div>
                </div>

                <div className="payment__section">

                    <div className="payment__title">
                        <h3>Tu Carrito</h3>
                        <h7>({ getCount() } productos)</h7>

                    </div>
                    <div className="payment__basket">

                        {basket.map(item =>(
                            <CheckoutProduct
                                id = {item.id}
                                item = {item.product}
                            />
                        ))}

                    </div>
                    <div className="payment__subtotal">
                        <CurrencyFormat
                            renderText={(value) => (
                                <>
                                    <p>
                                        Subtotal ({getCount()} productos): <strong> {value} </strong>
                                    </p>
                                </>
                            )}
                            decimalScale={2}
                            value={getSubtotal()}
                            displayType={'text'}
                            thousandSeparator={true}
                            prefix={'$'}
                        />
                    </div>
                    
                    
                </div>

                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Metodos de Pago</h3>
                    </div>
                    <div className="payment__info">
                        Mercado Pago API
                    </div>
                </div>

                <div className="payment__section">
                    <div className="payment__buyBtn">
                        <button onClick={onBuyClick}>Finalizar Compra</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Payment
