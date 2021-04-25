import { Avatar } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'
// material ui icons 

import AccessTimeIcon from '@material-ui/icons/AccessTime';
import SearchIcon from '@material-ui/icons/Search';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

function Header() {
    // user

    const [ user , loading] = useAuthState(auth);

    
    return (
        <HeaderContainer>
            {/* <h1>I am Header</h1> */}
            {/* header left */}
            <HeaderLeft>
                <HeaderAvatar
                alt = {user?.displayName}
                src = {user?.photoURL}
                onClick = {() => auth.signOut()}
                ></HeaderAvatar>
                <AccessTimeIcon></AccessTimeIcon>
            </HeaderLeft>
            {/* header middle */}
            <HeaderSearch>
                <SearchIcon></SearchIcon>
                {/*input field  */}
                <input placeholder = 'Search'> 
                </input>
            </HeaderSearch>
            {/* header right  */}

            <HeaderRight>
                <HelpOutlineIcon></HelpOutlineIcon>
            </HeaderRight>
        </HeaderContainer>
    )
}

export default Header;

const HeaderRight = styled.div`
flex : 0.3;
align-items : flex-end;
display : flex;

> .MuiSvgIcon-root {
    margin-left : auto ;
    margin-right : 20px;
}
`;

const HeaderContainer = styled.div`
display : flex;
/* after this the bg of the header */
position : fixed;
width : 100%;
align-items : center;
justify-content :space-between;
padding : 10px 0;
background-color : var(--slack-color);
color : white;
`;

const HeaderLeft = styled.div`
flex : 0.3;
display : flex;
align-items: center;
margin-left : 20px;

/* this is targeting the mui icon which is responsive */
> .MuiSvgIcon-root {
    margin-left : auto;
    margin-right : 30px
}

`

const HeaderAvatar = styled(Avatar)`
cursor : pointer;

:hover {
    opacity : 0.8;
}
`;

const HeaderSearch = styled.div`
flex : 0.4;
opacity : 1;
border-radius : 6px;
background-color : #421f44;
text-align : center;
display : flex;
padding : 0 50px;
color : gray;
border : 1px gray solid;

> input {
    background-color : transparent;
    border : none ;
    text-align : center ;
    min-width : 30vw;
    outline : 0;
    color : white;
}
`;

