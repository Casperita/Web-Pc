import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import { useStateValue } from '../StateProvider';
import './Purchases.css'
import PurchasesItems from './PurchasesItems';

function Purchases() {

    const [ { user } ] = useStateValue(); 

    const [purch, setPurch] = useState()

    const getPurchasedItems = () => {
        db.collection('basketItems').doc(`${user?.uid}`).collection('purchases').onSnapshot((snapshot) => {
            let tempItems=[undefined]

            tempItems = snapshot.docs.map((doc) => (
            {
                id: doc.id,
                product: doc.data()
            }
            ))
            if(tempItems.length!=0){
                setPurch(tempItems);
            }

        })
        
    }

    useEffect(() => {
        getPurchasedItems();
    }, [user])

    return (
        <div className='purchases'>
            <div className="purchases__container">
                <div className="purchase__title">
                    <h3>Mis Compras</h3>
                </div>
                

                <div className="purchases__each">

                    {purch
                    ? purch.map(item =>(
                        <PurchasesItems
                        id = {item.id}
                        item= {item.product}
                        />
                    ))
                    : (<h3 className='purchases__eachTitle'> Realiza una compra para verla aca </h3>)}
                    
                </div>


                
            </div>
            
        </div>
    )
}

export default Purchases

