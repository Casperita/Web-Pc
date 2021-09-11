import React, { useState, useRef, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { auth, storage, db, delField } from '../firebase';
import { useStateValue } from '../StateProvider';
import { useSpring, animated, config } from "react-spring";
import './Perfil.css';
import './InfoUsuario';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as BsIcons from 'react-icons/bs';

function InfoEdit ( { address } ) {

    const [ { openEdit, user }, dispatch] = useStateValue();

    const inputFile = useRef(null);
    const btnEdit = useRef(null);

    const nameActual = user.displayName;
    const photoURL_Actual = user.photoURL;
    const photoIMG_Actual = user.photoURL;
    const phoneNumber_actual = address.phoneNumber;
    const dni_actual = address.dni;
    const address1_actual = address.address1;
    const city1_actual = address.city1;
    const cp1_actual = address.cp1;

    const [displayName, setDisplayName] = useState(nameActual);
    const [imageAsFile, setImageAsFile] = useState(null);
    const [avatar, setAvatar] = useState(photoIMG_Actual);
    const [phone, setPhone] = useState(phoneNumber_actual);
    const [dni, setDni] = useState(dni_actual);
    const [newAddress, setNewAddress] = useState(true);
    const [address1, setAddress1] = useState(address1_actual);
    const [city1, setCity1] = useState(city1_actual);
    const [cp1, setCp1] = useState(cp1_actual);
    const [email, setEmail] = useState('');

    const UserUpdate = () => {

        user.updateProfile({
            displayName: `${displayName}`,
            photoURL: `${avatar}`
        });

        db.collection('basketItems').doc(`${user?.uid}`).set({
            phoneNumber: `${phone}`,
            dni: `${dni}`,
            address1: `${address1}`,
            city1: `${city1}`,
            cp1: `${cp1}`
        })
        .then(
            dispatch({ type:'UPDATE_EDIT', data: false })
        )
    }

    function onChangeHandler(event) {
        const { name, value } = event.currentTarget;

        if (name === "userEmail") {
            setEmail(value);
        } else if (name === "displayName") {
            setDisplayName(value);
        } else if (name === "file"){
            const [file] = event.currentTarget.files;
            setImageAsFile(file);
            if (file) {
                setAvatar(URL.createObjectURL(file));
                handleFireBaseUploud(file)
            }
        } else if (name === "phone"){
            setPhone(value);
        } else if (name === "dni"){
            setDni(value);
        } else if (name === "address1"){
            setAddress1(value);
        } else if (name === "city1"){
            setCity1(value);
        } else if (name === "cp1"){
            setCp1(value);
        }
    };

    const deleteAddress = () => {
        db.collection('basketItems').doc(`${user?.uid}`).update({
            address1: delField,
            city1: delField,
            cp1: delField
        })

        setAddress1(null);
        setCity1(null);
        setCp1(null);
        setNewAddress(!newAddress);
    }

    function handleFireBaseUploud(file) {

        console.log("inicio de subida")
        
        if(imageAsFile === '' ){
            console.error(`No es una imagen, el tipo de archivo es ${typeof(imageAsFile)}`)
        }

        const ref = storage.ref(`/images/${file?.name}`);
        const uploadTask = ref.put(file);

        uploadTask.on("state_changed", 
        (snapShot) => {
            console.log(snapShot)
        }, (err) => {
            console.log(err)
        }, () => {
            ref
            .getDownloadURL()
            .then((avatar) => {
                setAvatar(avatar);
            });
        });
    }

    function onButtonClick() {
        inputFile.current.click();
    }

    function direccion(address1, newAddress){
        if (address1 != null && newAddress == true){
            return (<div className="perfil__infoAddress_infoEdit"> 
                    <p className="perfil__infoAddress_address"> { address.address1 ? address1 : null}</p>
                    <p className="perfil__infoAddress_city"> { address.city1 ? city1 : null}</p>
                    <p className="perfil__infoAddress_city"> { address.cp1 ? cp1 : null}</p>
                    </div>)
        } else if(address1 != null && newAddress == false){
            return null
        }
    }

    const imgAppear = useSpring({
        to: {opacity: 1, transform: 'translate3D(0,0,0)'},
        from: {opacity: 0, transform: 'translate3D(0,-80px,0)'},
        config: config.slow
    })

    const nameAppear = useSpring({
        to: {opacity: 1, transform: 'translate3D(0,0,0)'},
        from: {opacity: 0, transform: 'translate3D(-80px,0,0)'},
        config: config.slow
    })

    return (
    <div>
        <div className='perfil__info'>
            <div className='perfil__iconEdit'>
                <img id="img_pp" src={user?.photoURL? (avatar) : 'userIcon__white.png' }/>
                <animated.div className='perfil__iconEdit_input' style={imgAppear}>
                    <input type="file" id="file" name="file" ref={inputFile} className="file" onChange={onChangeHandler} />
                    <button type='button' onClick={onButtonClick}> Subir Imagen </button>
                </animated.div>

            </div>

            <div className='perfil__infoRight_Edit'>
                <animated.div style={nameAppear}>
                    <p>Nuevo Username</p>
                    <input className='perfil__infoNameEdit' type='text' id='displayName' name='displayName' 
                    value={displayName} 
                    placeholder={user.displayName ? (user.displayName) : 'Nombre de usuario'}
                    onChange={event => onChangeHandler(event)} required />

                    <p  className='perfil__infoEmail_edit'> <AiIcons.AiOutlineMail/> {user?.email} <AiIcons.AiTwotoneEdit /> </p>
                    <div>
                        { address.dni
                        ? (<p className='perfil__infoName_dni'> <AiIcons.AiFillIdcard />DNI {address.dni}</p>)
                        : (<input className='perfil__infoName_dniEdit' type='tel' id='dni' name='dni'
                            minLength='8' maxLength='8'
                            value={dni}
                            placeholder={address.dni ? (address.dni) : '99999999'}
                            onChange={event => onChangeHandler(event)} 
                            required />) }
                    </div>
                    <p className='perfil__infoNro_editTittle'>Nuevo Numero de Telefono</p>
                    <input className='perfil__infoNro_edit' type='tel' id='phone' name='phone' 
                    minLength='8' maxLength='10'
                    value={phone}
                    placeholder={address.phoneNumber ? (address.phoneNumber) : '1199999999'}
                    onChange={event => onChangeHandler(event)} required />

                    <div className="perfil__infoAddress_tittle">
                        <div className="perfil__infoAddress_title">
                            <p> <AiIcons.AiFillHome />  Domicilios</p>
                        </div>
                        
                        { direccion(address1, newAddress) }

                        { newAddress            
                        ? (<div>
                            {address.address1 ? null : <p>Ingresar un Domicilio de Envio</p>}
                            </div>)
                        : (<div className="perfil__infoAddress_infoEdit">

                            <p>Calle y Numero</p>
                            <input type='text' id='address1' name='address1'
                            value={address1}
                            placeholder={address.address1 ? (address.address1) : 'Av. Maipú 2100'}
                            onChange={event => onChangeHandler(event)} required />

                            <p>Ciudad, Provincia, Pais</p>
                            <input type='text' id='city1' name='city1'
                            value={city1}
                            placeholder={address.city1 ? (address.city1) : 'Olivos, Buenos Aires, Argentina'}
                            onChange={event => onChangeHandler(event)} required />

                            <p>Codigo Postal</p>
                            <input type='text' id='cp1' name='cp1'
                            value={cp1}
                            placeholder={address.cp1 ? (address.cp1) : '1636'}
                            onChange={event => onChangeHandler(event)} required />

                        </div>)
                        }
                        <div className='perfil__infoAddress_addBtn'>
                            {newAddress
                            ? (<button type='button' onClick={() => setNewAddress(!newAddress)} >
                            {address1 ? "Editar Direccion de Envio" :"Nueva Direccion de Envio"}
                            </button>)
                            :null}
                            {address.address1
                            ? (<button type='button' onClick={deleteAddress}>Borrar Direccion</button>) 
                            : null}

                        </div>


                    </div>

                </animated.div>

                <button type='button' onClick={() => UserUpdate()}>Guardar cambios</button>
            </div>
            
        </div>
    </div>

    )
}

export default InfoEdit