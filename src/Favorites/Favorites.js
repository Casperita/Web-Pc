import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import { useStateValue } from '../StateProvider';
import './Favorites.css'
import FavoritesItems from './FavoritesItems'

function Favorites() {

    const [ { user } ] = useStateValue();

    const [favorite, setFavorite] = useState();

    const getFavorites = () => {
        db.collection('basketItems').doc(`${user?.uid}`).collection('favs').onSnapshot((snapshot) => {
            let tempFavs=[];

            tempFavs = snapshot.docs.map((doc) => (
            {
                id: doc.id,
                product: doc.data()
            }
            ));
            if(tempFavs.length!=0){
                setFavorite(tempFavs);
            }
    })
    }

    useEffect(() => {
        getFavorites();
    }, [user])

    return (
        <div className='favs'>
            
            <div className="favs__container">
                <div className="favs__title">
                    <h3>Favoritos</h3>
                </div>

                {favorite
                ? favorite.map((data) => (
                    <FavoritesItems
                    id={data.id}
                    title={data.product.title}
                    price={data.product.price}
                    img={data.product.img}
                    />
                ))
                : (<h3 className='favs__noExiste'>Agregar Productos a favoritos para verlos aca</h3>)}
                

            </div>

        </div>
    )
}

export default Favorites
