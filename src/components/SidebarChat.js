import React from 'react'
import styled from 'styled-components'

// Mui
// Mui

import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CreateIcon from '@material-ui/icons/Create';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import AppsIcon from '@material-ui/icons/Apps';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddBoxIcon from '@material-ui/icons/AddBox';
import SidebarOption from './SidebarOption';

import {useCollection} from 'react-firebase-hooks/firestore'
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

function SidebarChat() {

    const [channels , loading , error] = useCollection(db.collection('rooms'));
     // here we are using thge firebase hooks
     const [ user ] = useAuthState(auth);

     console.log(channels);

    return (
        <SidebarChatContainer>
                <SidebarHeader> 
                    <SidebarInfo>
                        <h2>Tilo React </h2>
                        <h3>
                            <FiberManualRecordIcon></FiberManualRecordIcon>
                            {user?.displayName}
                        </h3>
                    </SidebarInfo>
                    <CreateIcon></CreateIcon>
                </SidebarHeader>

                <SidebarOption Icon = {InboxIcon} title = 'Mentions and Reactions'></SidebarOption>
                <SidebarOption Icon = {DraftsIcon} title = 'Saved'></SidebarOption>
                <SidebarOption Icon = {BookmarkIcon} title = 'Channel Browser'></SidebarOption>
                <SidebarOption Icon = {PeopleAltIcon} title = 'People and User Groups'></SidebarOption>
                <SidebarOption Icon = {AppsIcon} title = 'Apps'></SidebarOption>
                <SidebarOption Icon = {FileCopyIcon} title = 'File Browser'></SidebarOption>
                <SidebarOption Icon = {ExpandLessIcon} title = 'Show less'></SidebarOption>
                <hr></hr>
                <SidebarOption Icon = {ExpandMoreIcon} title = 'Direct Messages'></SidebarOption>
                <hr></hr>
                <SidebarOption Icon = {AddBoxIcon} title = 'Add Channel' addChannelOption></SidebarOption>

                {/* here we are going to implement the groups with the name which is popup */}
                {/* and it comes from the sidebarpotion id and , each rooms has id , with id we going to implement the data and after clicking 
                the group it has to route to the particular room of collection */}

                    {/* we are going to map through the chat */}

                    {channels?.docs.map((doc) => (
                            <SidebarOption 
                             key = {doc.id} 
                             title = {doc.data().name}
                             id = {doc.id}
                            //  addChannelOption
                             ></SidebarOption>
                    ))}

        </SidebarChatContainer>
    )
}

export default SidebarChat


const SidebarChatContainer = styled.div`
background-color : var(--slack-color);
flex : 0.3;
color : white;
border-top : 1px solid #49274b;
max-width : 260px;
margin-top : 60px;

>hr {
    margin-bottom: 10px ; 
    margin-top: 10px;
    border: 1px solid #49274b;
}
`

const SidebarHeader = styled.div`
display : flex;
border-bottom : 1px solid #49274b ;
padding : 13px;

> .MuiSvgIcon-root {
    padding : 8px;
    color : #49274b;
    font-size : 18px ;
    background-color : white;
    border-radius : 999px;
}
`

const SidebarInfo = styled.div`
flex : 1;

> h2 {
    font-size : 15px ;
    font-weight : 900;
    margin-bottom : 5px;
}

> h3 {
    display : flex;
    font-size : 13px;
    font-weight : 400;
    align-items : center;
}

> h3 > .MuiSvgIcon-root {
    font-size : 15px;
    margin-right : 1px ;
    margin-left : 5px ;
    color : green
}
`