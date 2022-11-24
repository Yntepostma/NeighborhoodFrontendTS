import { useState, useEffect } from "react";

export const SignupPage = () => {
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="user name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="text"
          placeholder="first name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="email address"
          value={emailAddress}
          onChange={(e) => setEmailAddress(e.target.value)}
        />
        <input
          placeholder="image url"
          type="text"
          value={profilePic}
          onChange={(e) => setProfilePic(e.target.value)}
        />
        <button type="submit"></button>
      </form>
    </div>
  );
};
