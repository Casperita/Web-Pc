import React, { useEffect, useState, useContext } from 'react'
import { useStateValue } from '../StateProvider'
import { useParams } from 'react-router-dom'
import AllTags from '../AddProduct/AllTags';
import { db, storage } from '../firebase';
import EveryTag from './EveryTag';
import HeaderSearch from './HeaderSearch';
import './SearchCategory.css'
import SearchedProducts from './SearchedProducts';

function SearchCategory() {

    let tempIndex = [];

    const [ state, dispatch ] = useStateValue();

    const { render, value } = HeaderSearch();
    let { searchTag, subCategory } = useParams();

    const [products, setProducts] = useState([]);
    const [index, setIndex] = useState([])

    const getProducts = () => {
        let tempProducts = []

        const dbRef = db.collection('products');
        const query = dbRef.orderBy('price')

        query.onSnapshot((snapshot) => {
            tempProducts = snapshot.docs.map((doc) => (
                {
                id: doc.id,
                product: doc.data()
            }
            ))
            setProducts(tempProducts);
            if(searchTag){getTags(tempProducts)}
            
        })
        
    }

    const getTags = (tempProducts) => {
        tempProducts.map((doc, index) => {
            let tempTags = [];
            let tempSub = [];
            let i, j;
            tempTags = doc.product.tags
            let l = tempTags.length

            if(searchTag == 'all'){
                tempIndex.push(index)
            } else {

                for(i=0; i<l; i++){
                    tempTags[i] = tempTags[i].toLowerCase();
                    
                    if(searchTag == tempTags[i]){
                        if(subCategory == undefined){
                            tempIndex.push(index)
                        } else {
                            for(j=0; j<l; j++){
                                if(subCategory == tempTags[j]){
                                    tempIndex.push(index)
                                }
                            }
                        }
                    }
                }
            }
        })
        setIndex(tempIndex)
    }   

    useEffect(() => {
        getProducts();
    }, [searchTag, subCategory])

    const onIndexSearch = (tempIndexSearch) => {
        dispatch({ type: 'UPDATE_INPUT', data: tempIndexSearch });
    }

    const getSearchedIndex = () => {
        if(state.inputText){
            setIndex(state.inputText)
            console.log("BUSCADOcategoria: ", state.inputText)
        }
    }

    useEffect(() => {
        getSearchedIndex();
    }, [state.inputText])

    console.log("ACTUAL INDEX: ", index)

    return (
        <div className='bigSearch'>

            <div> {value} </div>

            <div className="bigSearch__container">

                <div className="bigSearch__allTags">

                    <EveryTag />

                </div>

                <div className="bigSearch__results">
                
                    <h3>Resultados para "{searchTag}" {subCategory ? ` / "${subCategory}"` : null}</h3>

                    <div className="bigSearch__items">
                        {index?.map((item) => (
                            <SearchedProducts
                            id={products[item]?.id}
                            img={products[item]?.product.img}
                            title={products[item]?.product.title}
                            price={products[item]?.product.price}
                            rate={products[item]?.product.rate}
                            />
                        ))}
                    </div>

                </div>

            </div>
        </div>
    )
}

export default SearchCategory
