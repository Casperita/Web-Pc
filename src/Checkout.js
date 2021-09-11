import React, { useState, useEffect } from 'react'
import './Checkout.css'
import * as AiIcons from 'react-icons/ai';
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from './StateProvider';
import Subtotal from './Subtotal'
import { db } from './firebase';
import Header from './Header';
import Cupon from './Cupon/Cupon';

function Checkout() {

    const [ { user, cuponDiscount } ] = useStateValue(); 

    const [basket, setBasket] = useState([]);

    const { render } = Cupon()

    const getBasketItems = () => {
        db.collection('basketItems').doc(`${user?.uid}`).collection('basket').onSnapshot((snapshot) => {
            const tempItems = snapshot.docs.map((doc) => ({
                id: doc.id,
                product: doc.data()
            }))
            setBasket(tempItems)

        })
        
    }

    useEffect(() => {
        getBasketItems();
    },[user])

    const getSubtotal = () => {
        let total = 0;
        basket.forEach((item) => {
            total += (item.product.price * item.product.quantity)
        })
        if(cuponDiscount){
            console.log("Total->", total - (total * cuponDiscount))
            return (total - (total * cuponDiscount))
        } else {
            return total
        }
    }

    const getCount = () => {
        let count = 0;
        basket.forEach((item) => {
            count += item.product.quantity
        })

        return count;
    }

    const deleteBasket = () => {

        document.getElementById('allProducts').className = 'deleteAll'

        setTimeout(() => {
            basket.forEach((item) => {
                db.collection('basketItems').doc(`${user?.uid}`).collection('basket').doc(`${item.id}`).delete()
        }); document.getElementById('allProducts').className = 'a'
        }, 400)
    };

    return (
        <div className='checkout'>

        {user
        ? (
            <div className='checkout__container'>

                <div className='checkout__left'>
                    <img className='checkout__ad' src='btc.jpg'/>

                        <div>
                            <h3> Hola, {user?.displayName ? (user?.displayName)  : 'tonto de mierda dame tu plata'}</h3>
                            <h2 className='checkout__title'> Tu Carrito </h2>
                            <button className='checkout__clearBasket' onClick={ deleteBasket }> Limpiar Carrito </button>
                            <div id='allProducts' className='checkout__eachProduct'>
                                {basket.map(item =>(
                                    <CheckoutProduct
                                        id = {item.id}
                                        item = {item.product}
                                    />
                                ))}
                            </div>
                        </div>

                </div>

            

                <div className='checkout__right'>
                    <Subtotal getCount={ getCount } getSubtotal={ getSubtotal } />
                    <div className='checkout__de_cupon'>
                        {render}
                    </div>
                </div>


            </div>)
        
        :   (<div className='checkout__notSignIn'> <h3>Debe iniciar Sesion para ver su Carrito</h3> </div>)
        }
        </div>

    )
}

export default Checkout