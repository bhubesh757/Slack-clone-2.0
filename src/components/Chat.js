import React, { useEffect, useRef } from 'react'
import styled from 'styled-components';
import SupervisorAccountOutlinedIcon from '@material-ui/icons/SupervisorAccountOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import { useSelector } from 'react-redux';
import { selectRoomId } from '../features/appSlice';
import ChatInput from './ChatInput';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import Message from './Message';

function Chat() {

    const chatRef = useRef(null);

    // gettng name  the room from the appslicea and the store

    const roomId = useSelector(selectRoomId);
    // instead of usestate and useEffect we are here to use the firebase hooks

    const [roomDetails] = useDocument(
            roomId && 
            db.collection('rooms').doc(roomId)
    )
    // detailshandles the name of the room 

    // this is for room messages , the messages send by the use

   const [roomMessages , loading ] = useCollection(
    roomId && 
    db.collection('rooms')
    .doc(roomId)
    .collection('messages')
    .orderBy('timestamp' , "asc")
   )

//    chatbottom
        useEffect(() => {
            chatRef?.current?.scrollIntoView({
                behavior : 'smooth'
            });
        }, [roomId , loading])


    // console.log('messages==' , roomMessages?.docs.map(doc => {

    // }) )
    // console.log('details==' , roomDetails?.data() )

    return (
        <ChatContainer>
            {roomDetails && roomMessages && (

            <>
            {/* <h1> i am chat screen</h1> */}
            <Header>
                {/* headet left  */}
                <HeaderLeft>
                    <h4 >
                <strong> # {roomDetails?.data().name} </strong>
                    </h4>
                <StarBorderOutlinedIcon></StarBorderOutlinedIcon>
                </HeaderLeft>
                {/* header right */}

                <HeaderRight>
                <p>
                        <SupervisorAccountOutlinedIcon></SupervisorAccountOutlinedIcon>
                        <PersonAddOutlinedIcon></PersonAddOutlinedIcon>
                        <InfoOutlinedIcon></InfoOutlinedIcon>
                        Details
                    </p>
                </HeaderRight>
            </Header>

            {/* chatmessages */}
            <ChatMessages>
                {/* sending the messages with the  dp of the user and the message of the user*/}
                {roomMessages?.docs.map(doc => {
                    const {message , timestamp , user , userImage} = doc.data();
                    return (
                        <Message 
                        key = {doc.id}
                        message = {message}
                        timestamp  = {timestamp}
                        user = {user}
                        userImage = {userImage}
                        >
                        </Message>
                    )
                })}
                <ChatBottom ref = {chatRef} >

                </ChatBottom>
            </ChatMessages>

            <ChatInput 
            chatRef = {chatRef}
            channelName = {roomDetails?.data().name}
            channelId = {roomId}>

            </ChatInput>
            </>
            ) }
        </ChatContainer>
    )
}

export default Chat

const ChatBottom = styled.div`
margin-bottom : 10px 
`;

const ChatMessages = styled.div`

`

const HeaderLeft = styled.div`

display : flex;
align-items: center;
    >h4 {
    display: flex;
    text-transform: lowercase;
    margin-right : 10px
    }
    > h4 > .MuiSvgIcon-root {
        margin-left: 10px;
    font-size: 18px;
    }
`;
const HeaderRight = styled.div`
    >p {
        display: flex;
    align-items: center;
    font-size: 14px;

    .MuiSvgIcon-root {
        margin-right: 5px !important;
    font-size: 16px;
    }
    }
`;

const Header = styled.div`
display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    border-bottom: 1px solid lightgray;
`

const ChatContainer = styled.div`
    flex: 0.7;
    flex-grow: 1;
    overflow-y: scroll;
    padding-bottom: 150px;
    margin-top : 60px
`;