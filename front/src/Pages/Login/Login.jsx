import axios from "axios";
import React from "react";
import { useState } from "react";
import { useInput } from "../../hooks/useInput";

const Login = props => {
  const email = useInput("");
  const password = useInput("");
  const requestlogin = async data => {
    const json = JSON.stringify(data);
    console.log(data);
    await axios.post("/api/user/signin", json).then(res => {
      console.log(res);
    });
  };
  const sendLoginInfo = () => {
    console.log(email.value);
    console.log(password.value);
    const data = { email: email.value, password: password.value };
    requestlogin(data);
  };
  return (
    <div>
      <div>login</div>
      <label htmlFor="id">id</label>
      <input
        type="text"
        id="id"
        onChange={e => email.onChange(e.target.value)}
      />
      <label htmlFor="pw">pw</label>
      <input
        type="password"
        id="pw"
        onChange={e => password.onChange(e.target.value)}
      />
      <button onClick={sendLoginInfo}>login</button>
    </div>
  );
};

export default Login;
