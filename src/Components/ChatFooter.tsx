import { useState } from 'react';
import { FormEvent } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../store/user/selectors';

/*@ts-ignore*/
export const ChatFooter = ({socket}) => {
  const [message, setMessage] = useState('');

  const user = useSelector(selectUser)

  const handleSendMessage = (e:FormEvent) => {
    e.preventDefault();
    if (message.trim() && user.userName) {
        socket.emit('message', {
          text: message,
          name: user.userName,
          id: `${socket.id}${Math.random()}`,
          socketID: socket.id,
        });
      }
    
    setMessage('');
  };
  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="inline-block px-6 py-2 mt-2 ml-2 border-2 border-teal-600 text-teal-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">SEND</button>
      </form>
    </div>
  );
};