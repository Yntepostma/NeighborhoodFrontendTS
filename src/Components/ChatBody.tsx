import { useNavigate } from 'react-router-dom';

/*@ts-ignore*/
export const ChatBody = ({ messages, userName }) => {
  const navigate = useNavigate();

  return (
    <>
      <header>
        <p>Hangout with Colleagues</p>
        <button>
          LEAVE CHAT
        </button>
      </header>

   
      <div className="message__container">
         {/*@ts-ignore*/}
        {messages.map(message => {
        return (
          message.name === userName) ? (
            <div key={message.id}>
              <p className="">You</p>
              <div className="">
                <p>{message.text}</p>
              </div>
            </div>
          ) : (
            <div className="message__chats" key={message.id}>
              <p>{message.name}</p>
              <div className="message__recipient">
                <p>{message.text}</p>
              </div>
            </div>
          )
          })}

        <div className="message__status">
        </div>
      </div>
    </>
  );
};

export default ChatBody;