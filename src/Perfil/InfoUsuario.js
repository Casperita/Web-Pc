import React, { useState, useRef, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { auth, storage, db } from '../firebase';
import { useStateValue } from '../StateProvider';
import { useSpring, animated, config } from "react-spring";
import './Perfil.css';
import InfoEdit from './InfoEdit';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as BsIcons from 'react-icons/bs';


function InfoUsuario( { address } ) {

    const [ { openEdit, user }, dispatch] = useStateValue();

    const [hover, setHover] = useState(false);
    const hoverState = useSpring({
        opacity: hover ? '1' : '0',
        config : config.slow
    })

    if(address.address1 === "undefined" || address.address1 === "null" ){
        console.log("ADDRES UNDEFINED   ", address.address1);
        address.address1 = null;
        address.city1 = null;
        address.cp1 = null;
        console.log("NUEVA ADDRESS UNDEFINED  ", address.address1)
    } else{
        console.log("NULL O DEFINIDO   ", address.address1);
    }

    const onEditBtn = () => {
        dispatch({ type:'UPDATE_EDIT', data: true })
    }

    return(

        <div className='perfil__info'>
            <div className='perfil__icon'>
                <img src={user?.photoURL ? user?.photoURL : 'userIcon__white.png'} />
            </div>

            <div className='perfil__infoRight'>

                <div className="perfil__infoRight_user">
                    <p className='perfil__infoName'>{user?.displayName}</p>
                    <p className='perfil__infoEmail'> <AiIcons.AiOutlineMail/>  {user?.email}</p>
                    <p className='perfil__infoName_dni'> <AiIcons.AiFillIdcard />DNI {address.dni}</p>
                    <p className='perfil__infoName_dni'> <AiIcons.AiFillPhone  />Telefono +54 {address.phoneNumber}</p>

                </div>

                <div className="perfil__infoAddress">
                    <div className="perfil__infoAddress_title">
                        <p> <AiIcons.AiFillHome />  Domicilios</p>
                    </div>
                    { address.address1
                    ? (<div className="perfil__infoAddress_info">
                        <p className="perfil__infoAddress_address"> { address.address1 }</p>
                        <p className="perfil__infoAddress_city"> { address.city1 }</p>
                        <p className="perfil__infoAddress_city"> { address.cp1 }</p>
                    </div>)
                    : "No hay Domicilios de Envio" }
                    <div>
                    { address.address2
                    ? ( <div className="perfil__infoAddress_info"> 
                        <p className="perfil__infoAddress_address"> { address.address2 ? address.address2 : null}</p>
                        <p className="perfil__infoAddress_city"> { address.city2 ? address.city2 : null}</p>
                        <p className="perfil__infoAddress_city"> { address.cp2 ? address.cp2 : null}</p>
                        </div>)

                        : null }
                    </div>
                    
                    <div> 
                    { address.address3 
                    ?(  <div className="perfil__infoAddress_info">
                        <p className="perfil__infoAddress_address"> { address.address3 ? address.address3 : null}</p>
                        <p className="perfil__infoAddress_city"> { address.city3 ? address.city3 : null}</p>
                        <p className="perfil__infoAddress_city"> { address.cp3 ? address.cp3 : null}</p> 
                        </div>)

                        : (null) }
                    </div>

                </div>

                <div className="perfil__infoEdit">
                    <button onClick={onEditBtn}> Editar Informacion </button>
                </div>

            </div>
        </div>
    )
}

export default InfoUsuario