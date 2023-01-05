import { useState, useEffect, useContext } from "react";
import socketIO from 'socket.io-client';
import { useSelector } from "react-redux";
import { selectUser } from "../store/user/selectors";
import { ChatBar, ChatFooter, ChatBody } from "../Components";
  /*@ts-ignore*/
const socket = socketIO.connect('http://localhost:4000');

  /*@ts-ignore*/
export const ChatPage = () => {
const user = useSelector(selectUser)

  const [userName, setUserName] = useState("");
  const [messages, setMessages] = useState([])
  const [users, setUsers] = useState([]);

  // const cleanedUsers = users.filter(user => user.userName !== )


  useEffect(()=> {
    if (user) {
      setUserName(user.userName)
    }
    socket.emit('newUser', { userName: user.userName, socketID: socket.id });

  }, [user])

  useEffect(() => {
      /*@ts-ignore*/
    socket.on('newUserResponse', (data) => setUsers(data));
  }, [socket, users]);



  useEffect(() => {
        /*@ts-ignore*/
    socket.on('messageResponse', (data) => setMessages([...messages, data]));
    
  }, [socket, messages]);





  return <div>
    
{/*@ts-ignore*/}
<div className="flex w-max flex-row justify between">
    <ChatBar users={users}/>
    <div className="flex flex-row">
    <ChatBody messages={messages} userName={userName}/>
    {/*@ts-ignore*/}
    <ChatFooter socket={socket}/>
    </div>
    </div>
  </div>;
};
