// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDptQbG7NL1n-i1xaB2aaNyuPHZYxUc4lY",
    authDomain: "what-s-app-clone-424ab.firebaseapp.com",
    projectId: "what-s-app-clone-424ab",
    storageBucket: "what-s-app-clone-424ab.appspot.com",
    messagingSenderId: "834289515724",
    appId: "1:834289515724:web:d726672417db50c4ed5669",
    measurementId: "G-F5NWQ0JD62"
  };

const firebaseApp=firebase.initializeApp(firebaseConfig); 
const db=firebaseApp.firestore();
const auth=firebase.auth();
const provider=new firebase.auth.GoogleAuthProvider();

export {auth,provider};
export default db;
