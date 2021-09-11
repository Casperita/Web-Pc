import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import { useStateValue } from '../StateProvider';
import DeleteProductItem from './DeleteProductItem';

function DeleteProduct() {

    const [ { user } ] = useStateValue(); 

    const [products, setProducts] = useState([]);

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
        getProducts()
    }, [user] )

    return (
        <div className='delete'>
            {products.map((data) => (
                <DeleteProductItem
                id={data.id}
                title={data.product.title}
                price={data.product.price}
                img={data.product.img}
                rate={data.product.rate}
                />
            ))}
        </div>
    )
}

export default DeleteProduct
