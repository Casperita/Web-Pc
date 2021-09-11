import React, { useEffect } from 'react'
import './BuildItems.css'
import CurrencyFormat from 'react-currency-format';
import { Link } from 'react-router-dom';

function BuildItems({ id, title, price, img, rate, rateCount }) {

    function getStars() {
        let tempStars = [ "✰", "✰", "✰", "✰", "✰"];
        let i;

        if(rate == 0){
            return(<p>{tempStars} ({rateCount})</p>)
        } else {
            let roundRate = Math.round(rate)
            for(i=0; i<roundRate; i++){
                tempStars[i] = "⭐"
            }
            return(<p>{tempStars} ({rateCount})</p>)
        }

    }

    const addToContainer = () => {
        console.log("agregado")
        //hacerlo con useContext
    }

    return (
        <div className='buildItem'>
            <div className="buildItem__container">

                <Link className='buildItem__link' to={`/productInfo/${id}`} >

                    <div className="buildItem__info">

                        <div className="buildItem__infoTitle">
                            <p> {title} </p>
                        </div>

                        <div className="buildItem__infoPrice">
                            <CurrencyFormat className='checkoutBuildItem__price'
                                renderText={(value) => (
                                    <>
                                        <strong className='checkoutBuildItem__priceTitle'> {value} </strong>
                                    </>
                                )}
                                decimalScale={2}
                                value={price}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'$'}
                            />
                        </div>

                        <div className="buildItem__infoRate">

                            {getStars()}

                        </div>

                    </div>

                    <div className="buildItem__img">
                        <img className="buildItem__imgImage" src={img} />
                    </div>

                </Link>

                <div className="buildItem__send">

                    <button className='buildItem__sendBtn'> Seleccionar </button>

                </div>

            </div>
        </div>
    )
}

export default BuildItems
