import React, { useEffect, useState } from 'react'
import './ChatMessages.css'
import * as AiIcons from 'react-icons/ai'

function ChatMessages({ msgId, text, time, img, uid }) {

    const [msgAdmin, setMsgAdmin] = useState(false)

    const isMessageFromAdmin = () => {
        if(uid == 'VilvXiHvODM1UYZ7NTt8FMPXDfo2'){
            setMsgAdmin(true)
        } else{
            setMsgAdmin(false)
        }
    }

    useEffect(() => {
        isMessageFromAdmin()
    }, [])       
    
    function showTime() {
        if(time == undefined) {
            return (<p> <AiIcons.AiOutlineUpload /> </p>)
        } else {
            return time.slice(0, -41)
        }
    }

    return (
        <div className='chatmsgs'>
            <div className="chatmsgs__container">

                <div className={msgAdmin ? 'chatmsgs__admin' : 'chatmsgs__user'}>

                    <p>{text}</p>

                    <img src={img} />

                    <small> {showTime()} </small>

                </div>

            </div>
        </div>
    )
}

export default ChatMessages
