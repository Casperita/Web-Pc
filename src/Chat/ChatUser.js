import React, { useEffect, useRef, useState } from 'react'
import './ChatUser.css'
import * as AiIcons from 'react-icons/ai'
import { db, orderByTime, storage } from '../firebase';
import { useStateValue } from '../StateProvider';
import ChatMessagesUser from './ChatMessagesUser';

function ChatUser() {

    const [ state, dispatch ] = useStateValue();

    const dummy = useRef(null);
    const inputFile = useRef(null);

    const [messages, setMessages] = useState([])
    const [msg, setMsg] = useState();
    const [imgFile, setImgFile] = useState(null)
    const [imgUrl, setImgUrl] = useState()

    const getMessages = () => {
        let tempMessages = []

        const msgsDocRef = db.collection('msgs').doc(`${state?.user?.uid}`).collection('message');
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
        getMessages();
    }, [state.user])

    const onSendMsg = () => {

        const uidMsgsDocRef = db.collection('msgs').doc(`${state?.user?.uid}`);

        uidMsgsDocRef.get()
        .then((doc) => {
            if(doc.exists){
                console.log("existe")
            } else {
                uidMsgsDocRef.set({
                    name: state.user.displayName,
                    photoUrl: state.user.photoURL
                })
            }
        })
        
        db.collection('msgs').doc(`${state?.user?.uid}`).collection('message').add({
            text: msg, 
            time: orderByTime,
            uid: state.user.uid
        })
        document.getElementById('inputSendMsg').value = ''
        setMsg('')
    }

    console.log("name", imgFile?.name)

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
        const uidMsgsDocRef = db.collection('msgs').doc(`${state?.user?.uid}`);

        uidMsgsDocRef.get()
        .then((doc) => {
            if(doc.exists){
                console.log("existe")
            } else {
                uidMsgsDocRef.set({
                    name: state.user.displayName,
                    photoUrl: state.user.photoURL
                })
            }
        })

        db.collection('msgs').doc(`${state?.user?.uid}`).collection('message').add({
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
        if(imgUrl) {
            onFireBaseUpload();
        } else {
            inputFile.current.click();
        }   
    }
    
    const onInputTextHandler = (e) => {
        setMsg(e.target.value)
    }

    const onScroll = () => {
        dummy.current?.scrollIntoView({ behavior: "smooth",
        block: "nearest",
        inline: "start" })
    }

    const HandleKeyPress = (e) => {
        if(e.key == "Enter"){
            onSendMsg();
        }
    }

    return (
        <div className='chatUser'>
            <div className="chatUser__container">

                <div className="chatUser__title">
                    <h3> Tenes una pregunta? Hablanos! </h3>
                </div>

                <div className="chatUser__messages">

                    {messages.map((doc) => (
                        <ChatMessagesUser
                            text={doc?.text}
                            time={doc?.time?.toTimeString()}
                            img={doc?.img}
                            uid={doc?.uid}
                        />
                    ))}
                    <p ref={dummy}></p>

                </div>

                {imgUrl
                ? (<div className="chatUser__sendImg">

                        <button onClick={() => setImgUrl(null)}><p><AiIcons.AiOutlineClose /></p></button>
                        <img src={imgUrl} />
                        <button onClick={onFireBaseUpload}><p><AiIcons.AiOutlineSend /></p></button>

                    </div>)
                : null}

                <div className="chatUser__send">

                    <button onClick={onSendImg}> <p><AiIcons.AiOutlineFileAdd /></p> </button>
                    <input type='file' id='file' name='file' ref={inputFile} className='inputFile' onChange={(e) => onFileSelect(e)} />
                    <textarea type='text' id='inputSendMsg' placeholder='Escribe un mensaje...' onKeyPress={(e) => HandleKeyPress(e)} onChange={(e) => onInputTextHandler(e)} />
                    <button onClick={onSendMsg}> <p><AiIcons.AiOutlineSend /></p> </button>

                </div>

            </div>
        </div>
    )
}

export default ChatUser
