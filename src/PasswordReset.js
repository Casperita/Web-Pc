import React, { useState, useContext } from "react";
import { Link, useHistory } from 'react-router-dom';
import { auth } from './firebase';
import { UserContext } from './StateProvider';
import './PasswordReset.css';


const PasswordReset = () => {

    const [email, setEmail] = useState('');
    const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);

    const onChangeHandler = event => {
        const { name, value } = event.currentTarget;

        if (name === 'userEmail'){
            setEmail(value);
        }
    };

    const sendResetEmail = event => {
        event.preventDefault();
        auth.sendPasswordResetEmail(email)
            .then(() => {
                setEmailHasBeenSent(true);
                setTimeout(() => {setEmailHasBeenSent(false)}, 3000);
            })
    };

    return (
        <div className='reset'>

            <Link to= '/'>           
                <img className="signin__logo" src='pclogo__black.png' />

            </Link>

            <div className='reset__container'>

                <h1> Reset your Password</h1>

                <form>
                    {emailHasBeenSent && (
                        <div >
                            Te enviamos un e-mail tonto
                        </div>
                    )}

                    <h5> E-mail</h5>
                    <input type='text' value={email} name='userEmail' placeholder='Pone tu mail flaco' onChange={onChangeHandler} />

                    <button className='reset__btn' onClick={event => { sendResetEmail(event) }}> Enviar link de reset contraseña </button>

                    <Link to='/login'>
                        Volver a Login
                    </Link>

                </form>

            </div>
            
        </div>
    )
}

export default PasswordReset
