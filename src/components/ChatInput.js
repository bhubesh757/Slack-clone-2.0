import { Button } from '@material-ui/core';
import React, { useRef, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components';
import { auth, db } from '../firebase';
import firebase from '/home/bhubesh/chatapp2.0/src/firebase.js'

function ChatInput({channelName , channelId , chatRef}) {

    // firestore auth 

    const [ user , loading] = useAuthState(auth);

    // const inputRef = useRef(null);
    const [input, setinput] = useState('')
    // sendmessage

    console.log(channelId);

    const sendMessage =(e) => {
        e.preventDefault();
        if(channelId) {
            db.collection('rooms').doc(channelId).collection('messages')
        .add({
            message : input ,
             user : user.displayName,
            userImage : user.photoURL,
            timestamp : firebase.firestore.FieldValue.serverTimestamp(),
        })

        chatRef?.current?.scrollIntoView({
            behavior : 'smooth'
        })

        setinput('');
    }
     
        }

    // const sendMessage = (e) => {
    //     e.preventDefault();
    //     // adding the message to the firebase
    //     if(!channelId) {
            
    //                 db.collection('rooms').doc(channelId).collection('message')
    //                 .add({
    //                     message : input,
    //                     user : 'bhubesh',
    //                     userImage : 'https://avatars.githubusercontent.com/u/55022929?v=4',
    //                     timestamp : firebase.firestore.FieldValue.serverTimestamp(),
    //                 });
            
    //                 // this make the input empty
    //                 setinput('');
    //     }
    //     // firebase part
    // }
    return (
        <ChatInputContainer>
            <form>
               <input 
               placeholder = {`Message #${channelName?.toLowerCase()}`}
                // placeholder = {`Message #room`}
               value = {input }
               onChange = {e => setinput(e.target.value) }
               ></input>
               <Button type = 'submit' onClick = {sendMessage}>Send</Button>
           </form>
        </ChatInputContainer>
    )
}

export default ChatInput


const ChatInputContainer = styled.div`
    border-radius: 20px;

     > form {
        position: relative;
    display: flex;
    justify-content: center;
    }
    > form > input {
        position: fixed;
    bottom: 30px;
    width: 60%;
    border: 1px solid gray;
    border-radius: 3px;
    padding: 20px;
    }

    >form > button {
        display: none !important;
    }
`;