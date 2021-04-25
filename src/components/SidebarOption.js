import React from 'react'
import { useDispatch } from 'react-redux';
import styled from 'styled-components'
import { enterRoom } from '../features/appSlice';
import { db } from '../firebase';


function SidebarOption({Icon , title , addChannelOption , id }) {
    // dispatch gun

    const dispatch = useDispatch();

    // this is the addchannel function and selectchannel options 
    const addChannel = () => {

        // what it does is , it creates a new channel in db
        const channelName = prompt('Please enter the channel name');

        if(channelName) {
            db.collection('rooms').add({
                name : channelName,
            })
        }
    }

    // it actually pushes the room

    const selectChannel = () => {
        if(id) {
            dispatch(enterRoom({
                roomId : id
            }))
        }

    }
    return (
        <SidebarOptionContainer
        onClick = {addChannelOption ? addChannel : selectChannel}
        >
            {/* if u pass the icon  then it renders the icon from the materila ui  */}
            {Icon && <Icon fontSize = 'small' style = {{padding : 10}}></Icon>}
            {Icon ? (
                    <h3>{title}</h3>
            ): (
                <SideOptionChannel>
                        <span> # </span>
                        {title}
                </SideOptionChannel>
            )}
        </SidebarOptionContainer>
    )
}

export default SidebarOption


const SidebarOptionContainer = styled.div`
display: flex;
    font-size: 13px;
    align-items: center;
    padding-left: 2px;
    cursor: pointer;

    :hover {
        background-color: #340e36;
    }

    > h3 {
        font-weight : 500
    }

    >h3 > span {
        padding: 15px
    }

    
`
const SideOptionChannel = styled.h3`
padding : 10px 0;
font-weight : 300
`