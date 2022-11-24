import { useState, useEffect } from "react";
import styled from "styled-components";
import { User } from "../store/user/slice";
import { useAppDispatch } from "../store/hooks";
import { signUp } from "../store/user/thunk";

export const SignupPage = () => {
  const dispatch = useAppDispatch();

  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const newUser: User = {
      userName,
      firstName,
      lastName,
      emailAddress,
      password,
      profilePicture: profilePic,
    };
    dispatch(signUp(newUser));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

const Container = styled.div`
  display: "flex";
  flex-direction: "column";
  margin: 15%;
`;
