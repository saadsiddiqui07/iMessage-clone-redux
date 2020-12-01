import React, { forwardRef } from "react";
import "./Message.css";
import { Avatar } from "@material-ui/core";
import "./Message.css";
import { selectUser } from "../../features/userSlice.js";
import { useSelector } from "react-redux";

const Message = forwardRef(
  (
    { id, contents: { message, timestamp, uid, photo, email, displayName } },
    ref
  ) => {
    const user = useSelector(selectUser);

    return (
      <div
        ref={ref}
        className={`message ${user.email === email && "message__user"}`}
      >
        <Avatar className="message__photo" src={photo} />
        <p>{message}</p>
        <small>{new Date(timestamp?.toDate()).toLocaleString()}</small>
      </div>
    );
  }
);
export default Message;
