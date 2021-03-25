import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import SidebarChats from "./SidebarChats.jsx";
import { Avatar, IconButton, Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import RateReviewIcon from "@material-ui/icons/RateReview";
import CancelIcon from "@material-ui/icons/Cancel";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import db, { auth } from "../../Firebase/firebase.js";
import firebase from "firebase";

const Sidebar = () => {
  const user = useSelector(selectUser);
  const [chats, setChats] = useState([]);

  // fetching the chats from the database
  useEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setChats(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    return () => {
      unsubscribe();
    };
  }, []);

  // adding new chat to the database
  const addNewChat = (e) => {
    e.preventDefault();
    const newChat = prompt("Enter new channel");
    if (newChat !== null) {
      db.collection("chats").add({ 
      chatName: newChat,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar className="sidebar__profile" src={user.photo} />
        <div className="sidebar__headerSearch">
          <SearchIcon className="sidebar__searchIcon" />
          <input type="text" placeholder="Search.." />
          <CancelIcon className="sidebar__searchIcon" />
        </div>
        <IconButton>
          <RateReviewIcon className="sidebar__addButton" onClick={addNewChat} />
        </IconButton>
      </div>

      <div className="sidebar__chats">
        {chats.map(({ id, data }) => (
          <SidebarChats key={id} id={id} contents={data} />
        ))}
      </div>
      <div className="sidebar__footer">
        <Avatar src={user.photo} />
        <div className="footer__info">
          <h4>{user.displayName}</h4>
          <p>{user.email}</p>
        </div>
        <Button onClick={() => auth.signOut()}>Logout</Button>
      </div>
    </div>
  );
};

export default Sidebar;
