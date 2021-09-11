import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import { useStateValue } from '../StateProvider';
import './Chat.css'
import ChatAdmin from './ChatAdmin';
import ChatUser from './ChatUser';
import {Link} from 'react-router-dom'

function Chat() {

    const [ { user }, dispatch] = useStateValue();

    const [userAdmin, setUserAdmin] = useState(false);

    const isUserAdmin = () => {
        if(user?.uid == 'VilvXiHvODM1UYZ7NTt8FMPXDfo2') {
            console.log("user is admin")
            setUserAdmin(true)
        }
    }

    useEffect(() => {
        isUserAdmin();
    }, [user])

    function onChatDisplay() {
        if(user){
            return userAdmin
                ? (<div className='chat__admin'>
                    <ChatAdmin />
                </div>)
                : (<div className='chat__user'>
                    <ChatUser />
                </div>)
        } else {
            return (<div className='chat__notSignIn'>
                <h3>Por favor Inicie Sesion para ver el chat</h3>
                <div className="chat__notSignIn_Btn">
                    <Link to='/login'>
                        <button className='chat__registerBtn'>Iniciar Sesion</button>
                    </Link>

                    <Link to='/signin'>
                        <button className='chat__registerBtn'>Registrarse</button>
                    </Link>
                </div>
            </div>)
        }
    }

    return (
        <div className='chat'>
            <div className="chat__container">

                {onChatDisplay()}

            </div>
        </div>
    )
}

export default Chat
