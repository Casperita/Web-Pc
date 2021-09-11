import React, { useEffect, useState, useContext, useRef } from 'react'
import { db, orderByTime, storage } from '../firebase';
import { useStateValue } from '../StateProvider';
import './ChatAdmin.css'
import ChatMessages from './ChatMessages';
import IndividualChats from './IndividualChats';
import * as AiIcons from 'react-icons/ai'

function ChatAdmin() {

    const [ state, dispatch ] = useStateValue();

    const dummy = useRef(null);
    const inputFile = useRef(null);

    const [userIds, setUserIds] = useState([]);
    const [messages, setMessages] = useState([])
    const [openChat, setOpenChat] = useState(false)
    const [msg, setMsg] = useState();
    const [imgFile, setImgFile] = useState(null)
    const [imgUrl, setImgUrl] = useState()

    const getAllUids = () => {
        let tempIds;
        
        db.collection('msgs').onSnapshot((snapshot) => {
            tempIds = snapshot.docs.map((doc) => ({
                id: doc.id, 
                name: doc.data().name,
                photoUrl: doc.data().photoUrl 
            }))
            setUserIds(tempIds)
        })
    }

    useEffect(() => {
        getAllUids();
    }, [])

    const getMessages = (userid) => {
        let tempMessages = []

        const msgsDocRef = db.collection('msgs').doc(`${userid}`).collection('message');
        const query = msgsDocRef.orderBy("time")

        query.onSnapshot((snapshot) => {
            tempMessages = snapshot.docs.map((doc) => ({
                msgId: doc.id,
                text: doc.data().text,
                uid: doc.data().uid,
                img: doc.data().img,
                time: doc.data().time?.toDate()
            }))       
            setMessages(tempMessages)  
            onScroll() 
        })
    }

    useEffect(() => {
        if(state.userIdChat){
            getMessages(state.userIdChat);
        }
    }, [state.userIdChat])

    const onInputTextHandler = (e) => {
        setMsg(e.target.value)
    }

    const onSendMsg = () => {
        db.collection('msgs').doc(`${state.userIdChat}`).collection('message').add({
            text: msg, 
            time: orderByTime,
            uid: state.user.uid
        })
        document.getElementById('inputSendMsg').value = ''
        setMsg('')
    }

    const onFireBaseUpload = () => {
        const ref = storage.ref(`/chatImg/${imgFile?.name}`);
        const uploadTask = ref.put(imgFile);

        uploadTask.on("state_changed", 
        (snapShot) => {
            console.log(snapShot)
        }, (err) => {
            console.log(err)
        }, () => {
            ref
            .getDownloadURL()
            .then((image) => {
                setImgUrl(image);
                onImageUpload(image)
            });
        });
    }

    const onImageUpload = (image) => {

        db.collection('msgs').doc(`${state.userIdChat}`).collection('message').add({
            img: image, 
            time: orderByTime,
            uid: state.user.uid
        })
        setImgUrl(null)
    }

    const onFileSelect = (e) => {
        const [file] = e.currentTarget.files;
        var fileURL = URL.createObjectURL(file)
        setImgFile(file)
        setImgUrl(fileURL)
    }

    const onSendImg = () => {
        if(imgUrl){
            onFireBaseUpload();
        } else {
            inputFile.current.click();
        }
    }

    const onScroll = () => {
        dummy.current.scrollIntoView({ behavior: "smooth",
        block: "nearest",
        inline: "start" })
    }

    const HandleKeyPress = (e) => {
        if(e.key == "Enter" ){
            onSendMsg();
        }
    }

    const HandleKeyImgUpload = (e) => {
        console.log(e)
    }

    function showImg() {
        if(imgUrl) {
            return (<div className="chatAdmin__sendImg">

                        <button className='chatAdmin__sendImg_close' onClick={() => setImgUrl(null)}><p><AiIcons.AiOutlineClose /></p></button>
                        <img src={imgUrl} />
                        <button className='chatAdmin__sendImg_send' id='sendImg' onClick={onFireBaseUpload}><p><AiIcons.AiOutlineSend /></p></button>

                    </div>)
        } else {
            return null
        }
    }

    return (
        <div className='chatAdmin'>
            <div className="chatAdmin__container">

                <div className="chatAdmin__chats" onClick={() => setOpenChat(true)}>
                    {userIds.map((doc, index) => (
                        <IndividualChats
                        id={userIds[index]?.id}
                        name={userIds[index]?.name}
                        photoUrl={userIds[index]?.photoUrl}
                        />
                    ))}
                </div>

                {openChat
                ? (<div className='chatAdmin__messages'>

                        <div className="chatAdmin__messagesContainer" id='divChat'>
                            {messages?.map((data) => (
                                <ChatMessages 
                                    msgId={data?.msgId}
                                    text={data?.text}
                                    time={data?.time?.toTimeString()}
                                    img={data?.img}
                                    uid={data?.uid}
                                />
                            ))}
                            <p ref={dummy}></p>
                        </div>

                        {showImg()}

                        <div className="chatAdmin__messagesSend">
                            <button onClick={onSendImg}> <p><AiIcons.AiOutlineFileAdd /></p> </button>
                            {imgUrl ? null : (<input type='file' id='file' name='file' ref={inputFile} className='inputFile' onChange={(e) => onFileSelect(e)} />)}
                            <textarea type='text' id='inputSendMsg' placeholder='Escribe un mensaje...' onKeyPress={imgUrl ? null : (e) => HandleKeyPress(e)} onChange={(e) => onInputTextHandler(e)} />
                            <button onClick={onSendMsg}> <p><AiIcons.AiOutlineSend /></p> </button>
                        </div>

                    </div>)
                : null
                }

                
            </div>
        </div>
    )
}

export default ChatAdmin
