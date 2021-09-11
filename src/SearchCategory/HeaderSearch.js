import React, { useState, useContext } from 'react'
import { db } from '../firebase'
import './HeaderSearch.css'
import * as AiIcons from 'react-icons/ai'
import SearchCategory from './SearchCategory'
import { useHistory } from 'react-router'
import { useStateValue } from '../StateProvider'

function HeaderSearch() {

    let tempIndexSearch = [];

    const history = useHistory();

    const [ state, dispatch ] = useStateValue();

    const [value, setValue] = useState()
    const [searchIndex, setSearchIndex] = useState([])

    const getProducts = () => {
        if(value){
            let tempProducts = []
            const dbRef = db.collection('products');
            const query = dbRef.orderBy('price')

            query.onSnapshot((snapshot) => {
                tempProducts = snapshot.docs.map((doc) => (
                    {
                    product: doc.data().title
                }
                ))
                getIndex(tempProducts)
            })
        }
    }

    const getIndex = (tempProducts) => {

        tempProducts.map((title, index) => {
            let tempTitle;
            tempTitle = title.product.toLowerCase();
            if( tempTitle.search(value.toLocaleLowerCase()) != -1 ){
                tempIndexSearch.push(index)
            }
        })
        setSearchIndex(tempIndexSearch)
        dispatch({ type: 'UPDATE_INPUT', data: tempIndexSearch });
        history.push('/search')
    }

    const HandleKeyPress = (e) => {
        if(e.key == "Enter"){
            getProducts();
        }
    }

    return {
    render: (
        <div className='headerSearch'>
            <div className="headerSearch__container"> 

                <input type='text' onKeyPress={(e) => HandleKeyPress(e)} onChange={(e) => setValue(e.target.value) } className='headerSearch__containerInput' />
                <button type='button' className='headerSearch__containerBtn'
                onClick={getProducts}>
                    <AiIcons.AiOutlineSearch />
                </button>

            </div>
        </div>
    )}
}

export default HeaderSearch
