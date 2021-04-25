import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyBHq90yJun_nP91bJvDVwkrsm0dR3UJi4A",
  authDomain: "myntra-chatapp.firebaseapp.com",
  projectId: "myntra-chatapp",
  storageBucket: "myntra-chatapp.appspot.com",
  messagingSenderId: "1072835173963",
  appId: "1:1072835173963:web:c54dfc10f3c3c85a41f7ce",
  measurementId: "G-4HW4SJTLZD"
};

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  // const login = firebase.login()

  const provider = new firebase.auth.GoogleAuthProvider();
  
  export {db , auth , provider };

  export default firebase