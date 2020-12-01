import React from "react";
import "./Login.css";
import { Button } from "@material-ui/core";
import { auth, provider } from "../../Firebase/firebase.js";

const Login = () => {
  const handleSignIn = (e) => {
    e.preventDefault();
    // signing in the user
    auth.signInWithPopup(provider).catch((err) => alert(err.message));
  };

  return (
    <div className="login">
      <div className="login__logo">
        <img
          src="https://media.idownloadblog.com/wp-content/uploads/2014/10/Messages-App-Icon.png"
          alt=""
        />
        <h1>iMessage</h1>
      </div>
      <Button onClick={handleSignIn}>Sign In</Button>
    </div>
  );
};

export default Login;
