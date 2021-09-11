import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { auth } from './firebase';
import firebase from 'firebase/app';
import './Login.css'
import * as AiIcons from 'react-icons/ai';


function Login() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = e => {
            e.preventDefault();
            auth.signInWithEmailAndPassword(email, password)
            .then(result => {
                if(result.user.emailVerified){
                    console.log("verificado epico")
                    history.push('/')
                } else{
                    console.log("NO verficado")
                    auth.signOut()
                    alert("Verifique su cuenta con el Email enviado a su correo electronico primero")
                }
            })
            .catch(error => alert(error.message))   

    }

    
    const signInWithGoogle = e => {
            const provider = new firebase.auth.GoogleAuthProvider();
            auth.signInWithPopup(provider)
            .then(auth => {
                history.push('/')
            })
            .catch(error => alert(error.message))
    }

    
    return (
        <div className='login'>
            <Link to= '/'>           
                <img className="login__logo" src='pclogo__black.png' />

            </Link>

            <div className='login__container'>
                <h1> Log-in </h1>

                <form>
                    <h5>E-mail</h5>
                    <input type='email' placeholder='Ej. chicocanchero@gmail.com' value={email} onChange={e => setEmail(e.target.value)} />

                    <h5>Contraseña</h5>
                    <input type='password' placeholder='Tu contraseña' value={password} onChange={e => setPassword(e.target.value)}/>

                    <button type='submit' onClick={signIn}
                     className='login__signInBtn'>Log in
                    </button>

                </form>
                
                <div className='login__google'  onClick={signInWithGoogle}>
                    <AiIcons.AiOutlineGoogle className='login__googleIcon' />
                    <button className='login__googleBtn'> Sign In with Google </button>
                </div>
                <p>
                    Dale pasame tus datos tonto de mierda dale
                </p>

                <Link to='/signin' >
                    <button type='submit' className='login__registerBtn'>
                        Crear cuenta 
                    </button>
                </Link>

                <Link to='/reset' className='password__reset'>
                    Olvide mi contraseña
                </Link>
            </div>
        </div>
    )
}

export default Login
