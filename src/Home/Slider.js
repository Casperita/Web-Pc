import React, {useRef, useEffect} from 'react'
import * as AiIcons from 'react-icons/ai'
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import './Slider.css'

function Slider({ products }) {

    const slideshow = useRef(null);
    const slider = useRef(null);
    const intervalSlideShow = useRef(null);

    const next = () => {
        if(slideshow.current){
            const firstElement = slideshow.current.children[0]
            const slideSize = slideshow.current.children[0].offsetWidth;

            slideshow.current.style.transition = `300ms ease-out all`;
            slideshow.current.style.transform = `translateX(-${slideSize}px)`

            const transition = () => {
                slideshow.current.style.transition = 'none';
                slideshow.current.style.transform = `translateX(0)`

                slideshow.current.appendChild(firstElement);
            }

            setTimeout(() => {
                transition();
            }, 300)
        }
    }

    const previous = () => {
        const index = slideshow.current.children.length - 1;
        const lastElement = slideshow.current.children[index]
        slideshow.current.insertBefore(lastElement, slideshow.current.children[0])

        const slideSize = slideshow.current.children[0].offsetWidth;

        slideshow.current.style.transition = 'none';
        slideshow.current.style.transform = `translateX(-${slideSize}px)`;

        setTimeout(() => {
            slideshow.current.style.transition = `300ms ease-out all`;
            slideshow.current.style.transform = `translateX(0)`
        }, 30);
    }

    useEffect(() => {
        intervalSlideShow.current = setInterval(() => {
            next();
        }, 5000)

        slider.current.addEventListener('mouseenter', () => {
            clearInterval(intervalSlideShow.current);
        })

        slider.current.addEventListener('mouseleave', () => {
            intervalSlideShow.current = setInterval(() => {
                next();
            }, 5000)
        })
    }, [])

    return (
        <div className='slide' ref={slider}>
            <div className="slide__container" ref={slideshow}>

                <div className="slide__slideShow">
                    <Link to='/search/videocard/nvidia'>
                        <img src='nvidiaSlide.png' />
                    </Link>
                    <div className="slide__slideShow_title">
                        <p>Ofertas con la compra de Placas de Video Nvidia</p>
                    </div>
                </div>

                <div className="slide__slideShow">
                    <Link to='/search/videocard/nvidia'>
                        <img src='rtxSlide.png' />
                    </Link>
                    <div className="slide__slideShow_title">
                        <p>Nuevas RTX 3090</p>
                    </div>
                </div>

                <div className="slide__slideShow">
                    <Link to='/search/pcarmada'>
                        <img src='pcGamerSlide.png' />
                    </Link>
                    <div className="slide__slideShow_title">
                        <p>Arma tu PC Gamer</p>
                    </div>
                </div>

                <div className="slide__slideShow">
                    <Link to='/search/perifetico/hyperx'>
                        <img src='hyperxSlide.png' />
                    </Link>
                    <div className="slide__slideShow_title">
                        <p>10% Descuento en Productos HyperX</p>
                    </div>
                </div>

                <div className="slide__slideShow">
                    <Link to='/search/perifetico/corsair'>
                        <img src='corsairSlide.png' />
                    </Link>
                    <div className="slide__slideShow_title">
                        <p>Los mejores Perifericos Corsair</p>
                    </div>
                </div>

                <div className="slide__slideShow">
                    <Link to='#'>
                        <img src='mercadoPagoSlide.png' />
                    </Link>
                    <div className="slide__slideShow_title">
                        <p>Paga como quieras con MercadoPago</p>
                    </div>
                </div>

            </div>

            <div>
                <button onClick={previous} className='slide__btnsPrev'>
                    <p><AiIcons.AiOutlineArrowLeft /></p>
                </button>

                <button onClick={next} className='slide__btnsNext'>
                    <p><AiIcons.AiOutlineArrowRight /></p>
                </button>
            </div>
            
        </div>
    )
}

export default Slider
