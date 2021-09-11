import React, { useState, useEffect } from 'react'
import './Home.css'
import Product from './Product';
import Slider from './Home/Slider'
import PcBuilds from './Home/PcBuilds'
import ProductsList from './Home/ProductsList'
import Categoria from './Categoria';
import { Link } from 'react-router-dom';
import { db } from './firebase';
import { useStateValue } from './StateProvider';


function Home() {

    const [products, setProducts] = useState([]);

    const [ { user }] = useStateValue();

    const getProducts = () => {
        db.collection('products').onSnapshot((snapshot) => {
            let tempProducts = []

            tempProducts = snapshot.docs.map((doc) => (
                {
                    id: doc.id,
                    product: doc.data()
                }
                ));
            setProducts(tempProducts);
        })
    }

    useEffect(() => {
        getProducts();
    }, [])

    console.log(user?.emailVerified)

    return (
        <div className='todo'>
            <div className='home'>
                
                <div className='home__container'>

                    <div className='home__slider'>
                        <Slider products={ products } />
                    </div>

                    <div className="home__Pc">
                        <PcBuilds />
                    </div>

                    <div className='home__product'>

                        <div className='home__row'>
                            {
                                products.slice(0, 2).map((data) => (
                                    <Product
                                    id={data.id}
                                    title={data.product.title}
                                    price={data.product.price}
                                    rate={data.product.rate}
                                    rateCount={data.product.rateCount}
                                    img={data.product.img}
                                    />
                                ))
                            }

                        </div>

                        <div className='home__row'>
                            {
                                products.slice(2, 4).map((data) => (
                                    <Product
                                    id={data.id}
                                    title={data.product.title}
                                    price={data.product.price}
                                    rate={data.product.rate}
                                    rateCount={data.product.rateCount}
                                    img={data.product.img}
                                    />
                                ))
                            }

                        </div>

                        <div className='home__row'>
                            {
                                <Product
                                id={products[4]?.id}
                                title={products[4]?.product.title}
                                price={products[4]?.product.price}
                                rate={products[4]?.product.rate}
                                rateCount={products[4]?.product.rateCount}
                                img={products[4]?.product.img}
                                />
                            }

                        </div>

                    </div>

                </div>

            </div>  
        </div>
    )
}

export default Home
