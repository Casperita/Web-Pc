import React, { useState, useEffect } from 'react'
import CurrencyFormat from 'react-currency-format'
import { db } from '../firebase';
import { useStateValue } from '../StateProvider';
import * as AiIcons from 'react-icons/ai';
import './PurchasesItems.css'
import StarRating from './StarRating';

function PurchasesItems( {id, item} ) {

    const [ { user } ] = useStateValue(); 
    const {render, count} = StarRating();

    const [opinion, setOpinion] = useState(false);
    const [content, setContent] = useState("");
    const [starsCount, setStarsCount] = useState(0);


    const onChangeHandler = (e) => {
        let tempInfo = e.target.value
        setContent(tempInfo);
    }

    const sendOpinion = () => {

        let tempRate, totalRate, rateCount;

        const product = db.collection('products').doc(`${item.id}`).collection('opinions').doc(`${user?.uid}`);

        if(starsCount == 0 || content == ""){
            alert("Complete todos los campos")
        } else {
            product.set({
                user: user.displayName,
                myRating: starsCount,
                opinion: `${content}`
            })

            const rate = db.collection('products').doc(`${item.id}`);
            rate.get()
            .then((docu) => {
                tempRate = docu.data().rate
                rateCount = (docu.data().rateCount)
                rateCount = rateCount+1
                if(tempRate == 0 || rateCount == 0){
                    totalRate = starsCount
                } else{
                    totalRate = (tempRate+starsCount)/2
                }
                rate.update({
                    rate: totalRate,
                    rateCount: rateCount
                })
                setOpinion(false)
            })
            
        }
    }

    const exitHandler = () => {
        setStarsCount(0);
        setContent("");
        setOpinion(!opinion);
    }

    useEffect(() => {
        setStarsCount(count)
    }, [count])


    return (
        <div className='item'>

            <div className='item__container'>

                <div className='item__img'>
                    <img src={item.img} alt="" />
                </div>

                <div className="item__section">
                    <h3>{item.title}</h3>
                    <p>Unidades: {item.quantity}</p>

                </div>

                <CurrencyFormat className='item__price'
                        renderText={(value) => (
                            <>
                                <strong className='item__priceTitle'>{value}</strong>
                            </>
                        )}
                        decimalScale={2}
                        value={item.price}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'$'}
                />

            </div>

            <div className="purchases__opinion">
                <button className='purchases__opinionSend' onClick={() => setOpinion(!opinion)}> Opinar </button>
            </div>

            {opinion
            ? (<div className='opinion'>
                <div className="opinion__container">
                    <div className='opinion__close'> <p onClick={() => exitHandler()}>
                    <AiIcons.AiFillCloseCircle /></p> </div>
                    <h3>Opinar sobre: {item.title}</h3>
                    <textarea onChange={(e) => onChangeHandler(e)} />


                    <div className="opinion__rate">
                        {render}
                    </div>


                    <button type='submit' onClick={sendOpinion}>Enviar</button>
                </div>
                
            </div>)
            : null}
            
        </div>
    )
}

export default PurchasesItems
