import { Avatar } from "@material-ui/core";
import React, { useState } from "react";
import "../css/MessageSender.css";
import VideocamIcon from "@material-ui/icons/Videocam";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import { useStateValue } from "../providers/stateProvider";
import firebase from "firebase";

function MessageSender() {
  const [{ user }, dispatch] = useStateValue();
  const [Input, setInput] = useState("");
  const [Imageurl, setImageurl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Input == "") {
      alert("please enter imageurl and text");
    } else {
      const id = firebase.firestore().collection("posts").doc().id;
      firebase.firestore().collection("posts").doc(id).set({
        id: id,
        message: Input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        profilePic: user.photoURL,
        username: user.displayName,
        image: Imageurl,
      });
      firebase.firestore().collection("likedposts").doc(id).set({
        id: id,
        username: user.displayName,
        profilePic: user.photoURL,
        message: Input,
        count: 0,
      });
      firebase.firestore().collection("likedpoststate").doc(id).set({
        username: user.displayName,
        id: id,
        state: "false",
      });
      setInput("");
      setImageurl("");
    }
  };
  return (
    <div className="messageSender">
      <div className="messageSender__top">
        <Avatar src={user.photoURL} />
        <form>
          <input
            className="messageSender__input"
            value={Input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            placeholder={`What's on your mind?, ${user.displayName}`}
          />
          <input
            placeholder="image URL (Optional)"
            value={Imageurl}
            onChange={(e) => setImageurl(e.target.value)}
          />
          <button onClick={handleSubmit} type="submit">
            Hidden Submit
          </button>
        </form>
      </div>
      <div className="messageSender__bottom">
        <div className="messageSender__option">
          <VideocamIcon style={{ color: "red" }} />
          <h3>Live Video</h3>
        </div>
        <div className="messageSender__option">
          <PhotoLibraryIcon style={{ color: "green" }} />
          <h3>Photo/Video</h3>
        </div>
        <div className="messageSender__option">
          <InsertEmoticonIcon style={{ color: "green" }} />
          <h3>Feeling/Activity</h3>
        </div>
      </div>
    </div>
  );
}

export default MessageSender;
