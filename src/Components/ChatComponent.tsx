import { useState, useEffect, useContext } from "react";
import { SocketContext } from "./Socket";

export const ChatComponent = () => {
  const socket = useContext(SocketContext);

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // useEffect(() => {
  //   if (!messages || messages.length === 0) {
  //     socket.emit("getPreviousMessages");
  //   }
  //   socket.on("receivePreviousMessages", (oldMessages) => {
  //     const newMessages = [];
  //     oldMessages.map((i) => {
  //       newMessages.push(i);
  //     });
  //     setMessages(newMessages);
  //   });
  //   socket.on("receiveMessage", (name, message) => {
  //     const newMessage = { name, message };
  //     setMessages([...messages, newMessage]);
  //   });
  // }, [messages]);

  return <div></div>;
};
