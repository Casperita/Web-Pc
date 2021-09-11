import React, { useEffect, useState } from 'react'
import './ChatMessagesUser.css'

function ChatMessagesUser({ text, time, img, uid }) {

    const [msgUser, setMsgUser] = useState(false);

    const isMessageFromUser = () => {
        if(uid == 'VilvXiHvODM1UYZ7NTt8FMPXDfo2'){
            setMsgUser(false)
        } else{
            setMsgUser(true)
        }
    }

    useEffect(() => {
        isMessageFromUser()
    }, [])

    return (
        <div className='chatmsgs'>
            <div className="chatmsgs__container">

                <div className={msgUser ? 'chatmsgs__admin' : 'chatmsgs__user'}>

                    <p>{text}</p>

                    <img src={img} />

                    <small>{time?.slice(0, -41)}</small>

                </div>

            </div>
        </div>
    )
}

export default ChatMessagesUser
