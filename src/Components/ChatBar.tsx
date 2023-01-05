type user = {
  userName: string,
  socketID: string
}

type UserProps = {
  users: user[]
}

export const ChatBar = ({users}:UserProps) => {

const filteredUsers = users.filter(user => user.userName !== "")

    return (

        <div className="chat__sidebar">
        <h2>Open Chat</h2>
  
        <div>
          <h4 className="chat__header">ACTIVE USERS</h4>
          <ul>
            {/*@ts-ignore*/}
            {filteredUsers.map((user) => {
              return (
              <li key={user.socketID}>{user.userName}</li>
              )

            })}
          </ul>
        </div>
      </div>
    );
  };
    