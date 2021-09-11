import React from 'react'
import './Footer.css'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <div className='footer'>
            <div className="footer__container">

                <div className="footer__logo">
                    <img src='pclogo.png' />
                    <h3> WebPc Canchera </h3>
                </div>

                <div className="footer__info">

                    <div className="footer__infoSection">
                        <p> <FaIcons.FaMapMarkerAlt /> </p>
                        <div className="footer__infoAddress_title">
                            <p>Numero y nombre de Calle</p>
                            <h3>Provincia, Pais</h3>
                        </div>
                    </div>

                    <div className="footer__infoSection">
                        <p> <FaIcons.FaPhone /> </p>
                        <h3>+54 11 9999-9999</h3>
                    </div>

                    <div className="footer__infoSection">
                        <p> <AiIcons.AiFillMail /> </p>
                        <a href='mailto: abc@example.com'>abc@example.com</a>
                    </div>

                </div>

                <div className="footer__socials">
                        <a href='https://twitter.com/Nazareno81' target='_blank'> <AiIcons.AiFillTwitterCircle/> </a>
                        <a href='https://www.youtube.com/channel/UCvs_VxHQOwfbVO6KtqbDWiQ' target='_blank'> <AiIcons.AiFillYoutube/> </a>
                        <a href='https://github.com' target='_blank'> <AiIcons.AiFillGithub/> </a>
                        <a href='https://www.linkedin.com/in/nazarenoateca/' target='_blank'> <AiIcons.AiFillLinkedin/> </a>
                </div>

                <div className="footer__about">

                    <div className="footer__aboutInfo">
                        <h3>Sobre nosotros</h3>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias neque amet incidunt aspernatur, 
                        quam necessitatibus quidem. Neque molestiae assumenda
                        quam necessitatibus quidem. Neque molestiae assumenda</p>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Footer
