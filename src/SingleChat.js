import { MoreVert } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { Avatar, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import AttachmentIcon from '@mui/icons-material/Attachment';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import "./SingleChat.css"
// import { makeStyles } from '@mui/styles';
import db from './firebase';
import { useStateValue } from './StateProvider';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

// const useStyles = makeStyles(theme => ({
//   customHoverFocus: {
//     "&:hover, &.Mui-focusVisible": { backgroundColor: "yellow" }
//   }
// }));

function SingleChat() {

  // const classes=useStyles();

  const [input, setInput] = useState("");
  const [seed, setSeed] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    if (roomId) {
      db.collection("rooms").doc(roomId).onSnapshot(snapshot => (
        setRoomName(snapshot.data().name)
      ))
      db.collection("rooms").doc(roomId).collection("messages").orderBy("timestamp", "asc").onSnapshot(snapshot => (
        setMessages(snapshot.docs.map(doc => doc.data()))
      ));
    }
  }, [roomId])

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000))
  }, [roomId])

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("You typed >>> ", input);
    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    setInput("");
  }

  return (
    <div className='chat'>
      <div className='chat__header'>
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />


        <div className='chat__headerInfo'>
          <h3>{roomName}</h3>
          <p>
            Last seen{" "}
            {
              new Date(
                ((messages[messages.length - 1]) && (messages[messages.length - 1].timestamp)) && (messages[messages.length - 1].timestamp.toDate()))
                .toUTCString()
            }
          </p>
        </div>

        <div className='chat__headerRight'>
          <IconButton >
            <SearchIcon />
          </IconButton>
          <IconButton >
            <AttachmentIcon />
          </IconButton>
          <IconButton >
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className='chat__body'>
        {messages.map(message => (
          <p className={`chat__message ${message.name === user.displayName && "chat__reciever"}`}><span className='chat__name'>{message.name}</span>
            {message.message}
            <span className='chat__timestamp'>
              {new Date((message.timestamp) ? (message.timestamp.toDate()) : ("")).toUTCString()}
            </span>
          </p>
        ))}
      </div>
      <div className='chat__footer'>
        <IconButton >
          <InsertEmoticonIcon />
        </IconButton>
        <form>
          <input value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text" placeholder='Type A Message' />
          <button onClick={sendMessage}>Send a message</button>
        </form>
        <IconButton>
          <MicIcon />
        </IconButton>
      </div>
    </div>
  )
}

export default SingleChat