import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import styled from 'styled-components';

// import { Counter } from './features/Counter';
import './App.css';
import Chat from './components/Chat';
import Header from './components/Header';
import SidebarChat from './components/SidebarChat';
import { auth } from './firebase';
// auth
import {useAuthState} from 'react-firebase-hooks/auth';
import Login from './components/Login';
import Spinner from 'react-spinkit'

function App() {

  // google authentication

  const [ user , loading] = useAuthState(auth);
  // apploading 

  if(loading) {
    return (
      <AppLoading>
        <AppLoadingContents>
        <img src = 'https://yt3.ggpht.com/ytc/AAUvwnhZtcTvJEkvuZMdTzjhPLvZGIQSo9nel4btx7j9rg=s900-c-k-c0x00ffffff-no-rj'></img>

        <Spinner
         name = 'ball-spin-fade-loader'
         color = 'purple'
         fadeIn = 'none'
        ></Spinner>
        </AppLoadingContents>
      </AppLoading>
    )
  }

  return (
    <div className="App">
     <Router>
       {!user ? (
         <Login></Login>
       ): (
      <>
          {/* Header */}
          <Header></Header>
          <AppBody>
          {/* sidebar chats  */}
          <SidebarChat></SidebarChat>
        <Switch>
          <Route path="/" exact >
          {/* chats */}
          <Chat></Chat>
          </Route>
        </Switch>
          </AppBody>
      </>
       )}
    </Router>
    </div>
  );
}

export default App;


const AppBody = styled.div`
display: flex;
height : 100vh
`

const AppLoading = styled.div`
  display : grid;
  place-items : center;
  height : 100vh ;
  width : 100%
`;
const AppLoadingContents = styled.div`

text-align :center ;
padding-bottom : 100px ;
display : flex ;
flex-direction : column;
justify-content: center ;
align-items:center;

>img {
  height : 100px ;
  padding : 20px;
  margin-bottom:40px
}
`