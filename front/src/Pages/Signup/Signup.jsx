import React from "react";
import { useState } from "react";

const Signup = props => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pwComfirm, setPwComfirm] = useState("");
  const registeUser = () => {
    console.log("register");
    console.log(name);
    console.log(email);
    console.log(pw);
    console.log(pwComfirm);
  };

  const handlerChangeName = e => {
    console.log(e.target.value);
    setName(e.target.value);
  };
  const handlerChangeEmail = e => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };
  const handlerChangePw = e => {
    console.log(e.target.value);
    setPw(e.target.value);
  };
  const handlerChangePwConfirm = e => {
    console.log(e.target.value);
    setPwComfirm(e.target.value);
  };
  return (
    <div>
      <div>Signup</div>
      <label htmlFor="name">name</label>
      <input type="text" id="name" onChange={handlerChangeName} />
      <label htmlFor="email">email</label>
      <input type="email" id="email" onChange={handlerChangeEmail} />
      <label htmlFor="pw">pw</label>
      <input type="password" id="pw" onChange={handlerChangePw} />
      <label htmlFor="pwconfirm">pwconfirm</label>
      <input type="password" id="pwconfirm" onChange={handlerChangePwConfirm} />
      <button onClick={registeUser}>가입하기</button>
    </div>
  );
};

export default Signup;
