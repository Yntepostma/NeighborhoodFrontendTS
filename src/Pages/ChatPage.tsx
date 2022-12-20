import { useState, useEffect, useContext } from "react";
import socketIO from 'socket.io-client';
import { useSelector } from "react-redux";
import { selectUser } from "../store/user/selectors";
import { ChatBar, ChatFooter } from "../Components";
  /*@ts-ignore*/
const socket = socketIO.connect('http://localhost:4000');

  /*@ts-ignore*/
export const ChatPage = () => {
const user = useSelector(selectUser)

  const [userName, setUserName] = useState("");
  const [messages, setMessages] = useState([])

  useEffect(()=> {
    if (user) {
      setUserName(user.userName)
    }

  }, [user])


  useEffect(() => {
        /*@ts-ignore*/
    socket.on('messageResponse', (data) => setMessages([...messages, data]));
  }, [socket, messages]);





  return <div>

    <ChatBar/>
    {/*@ts-ignore*/}
    <ChatFooter socket={socket}/>
  </div>;
};
