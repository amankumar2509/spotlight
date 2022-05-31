import { Button } from '@material-ui/core';
import React from 'react';
import '../css/login.css';
import { auth, provider } from "../files/firebase";
import { actionTypes } from '../providers/reducers/reducer';
import { useStateValue } from '../providers/stateProvider';


function Login() {
    const [state, dispatch] = useStateValue();
    const signIn = () => {
        auth.signInWithPopup(provider).then((result) => {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user
            })
            //console.log(result);
        }).catch((error) => alert(error.message));
    }
    return (
      <div className="login">
        <div className="login__logo">
          <img src={require("./images/spotlight2_.png")} height={700} width={700} />
        </div>
      
        <Button type="submit" onClick={signIn}>
          Sign In
        </Button>
      </div>
    );
}

export default Login;
