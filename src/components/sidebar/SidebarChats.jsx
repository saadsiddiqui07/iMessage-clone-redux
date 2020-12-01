import React, { useState, useEffect } from "react";
import "./SidebarChats.css";
import { Avatar } from "@material-ui/core";
import { setChatInfo } from "../../features/appSlice.js";
import { useDispatch } from "react-redux";
import db from "../../Firebase/firebase.js";

const SidebarChats = ({ id, contents: { chatName, timestamp } }) => {
  const [seed, setSeed] = useState("");
  const [lastMessage, setLastMessage] = useState([]);
  const dispatch = useDispatch();

  // for different profile pictures
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 1000));
  }, []);

  //fetching the last message from the database
  useEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot(snapshot =>
        setLastMessage(snapshot.docs.map(doc => doc.data()))
      );
    return () => {
      unsubscribe();
    };
  }, [id]);

  return (
    <div
      className="sidebarchats"
      onClick={() =>
        dispatch(
          setChatInfo({
            chatName: chatName,
            chatId: id
          })
        )
      }
    >
      <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

      <div className="sidebarchats__info">
        <h4>{chatName}</h4>
        <p className="sidebarchats__message">{lastMessage[0]?.message}</p>
      </div>
      <span className="timestamp">
        {new Date(lastMessage[0]?.timestamp?.toDate()).toLocaleString()}
      </span>
    </div>
  );
};

export default SidebarChats;
