import React, { useEffect } from "react";
import "./App.css";
import Sidebar from "./components/sidebar/Sidebar.jsx";
import Chats from "./components/chats/Chats.jsx";
import Login from "./components/login/Login.jsx";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, login, logout } from "./features/userSlice";
import { auth } from "./Firebase/firebase";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      //console.log(authUser);
      if (authUser) {
        // the user will be logged in
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            displayName: authUser.displayName,
            email: authUser.email
          })
        );
      } else {
        dispatch(logout());
      }
    });
    // clean up action
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <>
          <Sidebar />
          <Chats />
        </>
      )}
    </div>
  );
}
export default App;
