import React, { useRef, useState } from 'react';
import './ChatOLD.css';
import { auth, db } from '../firebase';

import firebase from 'firebase/app';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';


function Chat() {

    const [user] = useAuthState(auth); 

  
    return (
        <div className="chat">
            <header className="chat__header">
                <h1>Chat Pambisito</h1>
                <SignOut />
            </header>

        <section  className='chat__section'>
            {user ? <ChatRoom /> : <SignIn />}
        </section>
        </div>
    );
}

function SignIn() {

  const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
  }

  return (
    <>
        <button className='sign__in' onClick={signInWithGoogle}> Sign In with Google </button>
    </>
  )
}


function SignOut() {

  return auth.currentUser && (
        <button className='sign__out' onClick={() => auth.signOut()}> Sign Out </button>
  )
}

function ChatRoom () {

  const dummy = useRef();

  const messagesRef = db.collection('messages');
  const query = messagesRef.orderBy('createdAt');

  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState(' ');

  const sendMessage = async (e) => {
        e.preventDefault();

        const { uid, photoURL } = auth.currentUser;

        await messagesRef.add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL,
        })

        setFormValue('');
        dummy.current.scrollIntoView({ behavior: 'smooth' });
    }



  return (
    <>
      <main className='chat__main'>
        

            {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} /> )}

            <span ref={dummy}></span>

      </main>

      <form className='chat__form' onSubmit={sendMessage}>
          <input className='chat__input' value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder='deci algo' />

          <button type='submit' className='chat__button' disabled={!formValue}> send </button>

      </form>
    </>
  )
}


function ChatMessage(props) {


  const {text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (
    <>
      <div className={`message ${messageClass}`}>
            <div className='chat__user'>
              <img className='chat__img' src= {photoURL} />
            </div>
            <p className='chat__p'> {text} </p>
      </div>
    </>
  )
}

export default Chat;
