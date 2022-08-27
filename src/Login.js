import React from 'react'
import "./Login.css"
import Button from '@mui/material/Button';
import { auth,provider } from './firebase';
import { useStateValue } from './StateProvider';
import {actionTypes} from "./reducer";
import image from "./Chatlieu.png";

function Login() {

    const [{},dispatch]=useStateValue();

    const signIn = () => {
        auth.signInWithPopup(provider).then(result => {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
            });
        }).catch(error => alert(error.message));
    }

  return (
    <div className='login'>
        <div className='login__container'>
            <img 
                src={image}
            />
            <div className='login__text'>
                <h1>Sign in to Chatieu 😎</h1>
            </div>
            <Button onClick={signIn}>
                Sign In With Google
            </Button>
        </div>
    </div>
  )
}

export default Login