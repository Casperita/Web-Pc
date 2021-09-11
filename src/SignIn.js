import React, { useContext, useState, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { auth, generateUserDocument, db, storage } from './firebase';
import firebase from 'firebase/app';
import './SignIn.css';
import * as AiIcons from 'react-icons/ai';
import { useStateValue } from './StateProvider';


const SignIn = () => {

    const [ { user }] = useStateValue();

    const history = useHistory();
    const inputFile = useRef(null)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPsw, setConfirmPsw] = useState('')
    const [displayName, setDisplayName] = useState('');
    const [avatar, setAvatar] = useState();
    const [imageAsFile, setImageAsFile] = useState(null)
    
    const createUserWithEmailAndPasswordHandler = (event, email, password) => {
        event.preventDefault();

        if(password === confirmPsw && displayName){
            auth.createUserWithEmailAndPassword(email, password)
            .then(function(result) {
                result.user.updateProfile({
                    displayName: displayName,
                    photoURL: avatar
                })
                result.user.sendEmailVerification();
                auth.signOut();
                alert("Email de verificacion enviado a su casilla de correo")
            })
            history.push('/login')
        } else {
            alert("Las contraseñas no coinciden")
        }
        
    };  


    const onChangeHandler = event => {
        const { name, value } = event.currentTarget;

        if (name === "userEmail") {
                setEmail(value);
          } else if (name === "userPassword") {
                setPassword(value);
          } else if(name === 'confirmPassword') {
                setConfirmPsw(value)
          } else if (name === "displayName") {
                setDisplayName(value);
          } else if (name === "file") {
                const [file] = event.currentTarget.files;
                setImageAsFile(file);
                if (file) {
                    setAvatar(URL.createObjectURL(file));
                    console.log("SETEADO AVATAR")
                    handleFireBaseUpload(file)
                }
          }
    };

    function handleFireBaseUpload(file) {
        
        console.log("INICIO SUBIDA", file)

        if(file === '' ){
            console.error(`No es una imagen, el tipo de archivo es ${typeof(imageAsFile)}`)
        }

        const ref = storage.ref(`/images/${file?.name}`);
        const upload = ref.put(file);

        upload.on("state_changed", 
        (snapShot) => {
            console.log(snapShot)
        }, (err) => {
            console.log(err)
        }, () => {
            ref
            .getDownloadURL()
            .then((avatar) => {
                setAvatar(avatar);
                console.log("imagen subida", avatar)
            });
        });
    }

    const signInWithGoogle = e => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider)
        .then(auth => {
            history.push('/')
        })
        .catch(error => alert(error.message))

    }

    const onButtonClick = () => {
        inputFile.current.click()
    }


    return (
        <div className='signin'>

            <Link to= '/'>           
                <img className="signin__logo" src='pclogo__black.png' />

            </Link>

            <div className='signin__container'>

                <h1> Sign Up </h1>

                <form>

                    <h5> Nombre </h5>
                    <input type='text' id='displayName' name='displayName' value={displayName} placeholder='Ej. Alberto Fernandez' onChange={event => onChangeHandler(event)} required  />
                    
                    <h5>E-mail</h5>
                    <input type='email' value={email} name='userEmail' placeholder='Ej. chicocanchero@gmail.com' onChange={event => onChangeHandler(event) } required  />

                    <h5>Contraseña</h5>
                    <input type='password' name='userPassword' placeholder='Tu contraseña' value={password} onChange={event => onChangeHandler(event)} required  />

                    <h5>Confirmar Contraseña</h5>
                    <input type='password' name='confirmPassword' placeholder='Confirmar tu contraseña' value={confirmPsw} onChange={event => onChangeHandler(event)} required  />

                    <h5>Foto de Perfil</h5>
                    <div className='signin__avatar'>
                        <input type="file" id="file" name="file" ref={inputFile} className="file" onChange={onChangeHandler} />
                        <button type='button' onClick={onButtonClick}> Subir Foto </button>
                        <img className='avatar__img' id='avatar_img' src={avatar ? (avatar) : 'userIcon__white.png' } />
                    </div>

                    <button type='submit' onClick={event => { createUserWithEmailAndPasswordHandler(event, email, password) }}
                     className='signin__signinBtn'>Sign Up
                    </button>

                </form>

                <p className='signin__or'> or </p>

                <div className='login__google'  onClick={signInWithGoogle}>
                    <AiIcons.AiOutlineGoogle className='login__googleIcon' />
                    <button className='login__googleBtn'> Sign In with Google </button>
                </div>

                <p className='signin__toLogin'> Ya tenes una cuenta? 
                    <Link to='/login'>
                        Log in here
                    </Link>
                </p>

            </div>
            
        </div>
    )
}


export default SignIn
