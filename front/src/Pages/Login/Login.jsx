import axios from "axios";
import React from "react";
import { useNavigate } from "react-router";
import Header from "../../Components/Header/Header";
import { useInput } from "../../hooks/useInput";

const Login = props => {
  const navigator = useNavigate();
  const email = useInput("");
  const password = useInput("");
  const requestlogin = async body => {
    console.log(body);
    try {
      const { headers, data } = await axios.post("/api/user/signin", body);
      console.log(data);
      console.log(headers);

      if (data.status === 200) {
        navigator("/");
      } else {
        data.msg && alert(data.msg);
      }
      return data;
    } catch (error) {
      // error.response.data && alert(error.response.data);
      // throw Error(error.response.data || error.message);
    }
  };
  const sendLoginInfo = () => {
    console.log(email.value);
    console.log(password.value);
    const data = { email: email.value, password: password.value };
    requestlogin(data);
  };
  return (
    <div>
      <Header />
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
