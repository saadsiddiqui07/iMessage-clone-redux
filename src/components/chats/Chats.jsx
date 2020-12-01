import React, { useState, useEffect } from "react";
import "./Chats.css";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import Message from "../message/Message.jsx";
import { useSelector } from "react-redux";
import { selectChatId, selectChatName } from "../../features/appSlice.js";
import db from "../../Firebase/firebase.js";
import { selectUser } from "../../features/userSlice";
import firebase from "firebase";
import FlipMove from "react-flip-move";

const Chats = () => {
  const user = useSelector(selectUser);
  const chatName = useSelector(selectChatName);
  const chatId = useSelector(selectChatId);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  // fetching messages from the database
  useEffect(() => {
    if (chatId) {
      db.collection("chats")
        .doc(chatId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
          )
        );
    }
  }, [chatId]);

  // sending message and adding to the database.
  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("chats").doc(chatId).collection("messages").add({
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      uid: user.uid,
      photo: user.photo,
      email: user.email,
      displayName: user.displayName,
    });
    setInput("");
  };

  return (
    <div className="chats">
      <div className="chats__header">
        <h4>
          To: <span className="chats__name">{chatName}</span>
        </h4>
        <strong>Deatils</strong>
      </div>

      <div className="chats__body">
        <FlipMove>
          {messages.map(({ id, data }) => (
            <Message key={id} contents={data} />
          ))}
        </FlipMove>
      </div>

      <div className="chats__input">
        <form>
          <input
            value={input}
            disable={!chatId}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Text Message"
          />
          <button onClick={sendMessage} disabled={!chatId} type="submit">
            send
          </button>

          <InsertEmoticonIcon className="chats__inputIcon" />
        </form>
      </div>
    </div>
  );
};

export default Chats;
