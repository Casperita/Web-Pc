import React, { useEffect, useState } from 'react'
import './BuildSelect.css'
import { useParams } from 'react-router'
import {db} from '../firebase'
import Product from '../Product';
import BuildItems from './BuildItems';

function BuildSelect() {

    let { type } = useParams();

    const [products, setProducts] = useState([])
    const [displayItems, setDisplayItems] = useState(null)

    const getProducts = () => {
        let tempProducts = []

        const productsRef = db.collection('products')
        let query = productsRef.orderBy('price')

        query.onSnapshot((snapshot) => {
            tempProducts = snapshot.docs.map((doc) => ({
                id: doc.id,
                img: doc.data().img,
                title: doc.data().title,
                price: doc.data().price,
                rate: doc.data().rate,
                rateCount: doc.data().rateCount,
                tags: doc.data().tags
            }))
            setProducts(tempProducts)
        })
    }

    useEffect(() => {
        getProducts();
    }, [])

    const getItems = (props) => {
        let tempTags = [];
        let tempDisplayItems = [];

        products.map((item, index) => {
            tempTags = item.tags
            console.log("buscando")
            if( tempTags.find(tags => tags === props) ){
                tempDisplayItems.push(products[index])
            }
        })
        setDisplayItems(tempDisplayItems)
    }

    return (
        <div className='selectBuild'>
            <div className="selectBuild__container">

                <h3>Select</h3>

                <div className="selectBuild__itemsContainer">

                    <div className="selectBuild__categories">

                        <button className='selectBuild__categoriesBtn' onClick={() => getItems('pcarmada')}>Pc Armada</button>

                        <button className='selectBuild__categoriesBtn' onClick={() => getItems('Motherboard')}>mother</button>

                        <button className='selectBuild__categoriesBtn' onClick={() => getItems('Procesador')}>procesador</button>

                        <button className='selectBuild__categoriesBtn' onClick={() => getItems('Procesador')}>procesador</button>

                        <button className='selectBuild__categoriesBtn' onClick={() => getItems('Procesador')}>procesador</button>

                        <button className='selectBuild__categoriesBtn' onClick={() => getItems('Procesador')}>procesador</button>

                        <button className='selectBuild__categoriesBtn' onClick={() => getItems('Procesador')}>procesador</button>

                        <button className='selectBuild__categoriesBtn' onClick={() => getItems('Procesador')}>procesador</button>

                        <button className='selectBuild__categoriesBtn' onClick={() => getItems('Procesador')}>procesador</button>

                        <button className='selectBuild__categoriesBtn' onClick={() => getItems('Procesador')}>procesador</button>

                        <button className='selectBuild__categoriesBtn' onClick={() => getItems('Procesador')}>procesador</button>
                        
                        <button className='selectBuild__categoriesBtn' onClick={() => getItems('Procesador')}>procesador</button>

                    </div>

                    <div className="selectBuild__items">
                        {displayItems
                        ? displayItems.map((doc) => (
                            <BuildItems
                            id={doc.id}
                            img={doc.img}
                            title={doc.title}
                            price={doc.price}
                            rate={doc.rate}
                            rateCount={doc.rateCount}
                            />
                        ))
                        : null}
                    </div>

                </div>



            </div>
        </div>
    )
}

export default BuildSelect
