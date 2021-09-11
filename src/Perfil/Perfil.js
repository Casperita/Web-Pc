import React, { useState, useRef, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { auth, storage, db } from '../firebase';
import { useStateValue } from '../StateProvider';
import { useSpring, animated, config } from "react-spring";
import './Perfil.css';
import InfoEdit from './InfoEdit';
import InfoUsuario from './InfoUsuario';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as BsIcons from 'react-icons/bs';



function Perfil() {

    const [ { openEdit, user }, dispatch] = useStateValue();
    const [address, setAddress] = useState([]);

    const handleAuthentication = () => {
        if (user){
            auth.signOut();
        }
    }

    const getAddress = () => {
        db.collection('basketItems').doc(`${user?.uid}`).get()
        .then((doc) => {
            if (doc.exists){
                const tempInfo = doc.data();
                setAddress(tempInfo);
            } else{
                console.log("NO HAY USUARIOO")
            }
        }) 
    }

    useEffect(() => {
        getAddress();
    },[user])

    return (
        <div className='perfil'>
            <div className="perfil__perfil">
                <h1 > Mi Perfil </h1>
                { user 
                ?  ( <div>
                        {openEdit
                            ? (<InfoEdit address={address} />)
                            : (<InfoUsuario address={address} />)
                        }
                    </div>)
                    
                : (   
                    <div className='perfil__register'>
                        <h1>Por favor, inicie sesion o cree una cuenta</h1>
                        <div className='perfil__registerLog'>

                            <Link to='/login'>
                                <button className='perfil__registerBtn'>Iniciar Sesion</button>
                            </Link>

                            <Link to='/signin'>
                                <button className='perfil__registerBtn'>Registrarse</button>
                            </Link>
                        </div>
                        <img src='anime.png' alt='' />
                    </div>
                )}
            </div>
        </div>
    )
}





export default Perfil
