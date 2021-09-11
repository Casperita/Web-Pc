import React, { useEffect, useState, useContext } from 'react'
import { db } from '../firebase'
import { useStateValue } from '../StateProvider';
import ChatMessages from './ChatMessages'
import './IndividualChats.css'

function IndividualChats({ id, name, photoUrl }) {

    const [indiChatOpen, setIndiChatOpen] = useState(false);

    const [ state, dispatch ] = useStateValue();

    const openChatWindow = () => {
        dispatch({ type: 'UPDATE_CHAT', data: id });
    }

    const onClickChange = () => {
        if(state.userIdChat == id){
            setIndiChatOpen(true)
            console.log("true")
        } else {
            setIndiChatOpen(false)
            console.log("false")
        }
    }

    useEffect(() => {
        onClickChange();
    }, [state.userIdChat])

    return (
        <div className={indiChatOpen ? 'indiChatOpen' : 'indiChat'}>
            <div className="indiChat__container">

                <div className="indiChat__chat" onClick={openChatWindow}>
                    <img src={photoUrl} />
                    <p> {name} </p>
                </div>

            </div>
        </div>
    )
}

export default IndividualChats
