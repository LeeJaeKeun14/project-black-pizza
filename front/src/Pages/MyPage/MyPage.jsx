import axios from "axios";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import Header from "../../Components/Header/Header";
import { loginState } from "../../store/atoms";

const MyPage = props => {
  const setIsLogin = useSetRecoilState(loginState);
  const navigator = useNavigate();
  const fetchUserPick = async () => {
    const { data } = await axios.get("/api/contents/userpick").then(res => {
      return res;
    });
    console.log(data);
    return data;
  };

  const userPick = useQuery("userPick", fetchUserPick);
  const logout = () => {
    axios.get("api/user/signout").then(res => {
      if (res.data.status === 200) {
        setIsLogin(false);
        navigator("/");
      }
    });
  };
  return (
    <div>
      <Header />
      <Button onClick={logout}>로그아웃</Button>
      <div>mypage</div>
      <div>찜한 목록</div>
      {userPick.isLoading && userPick.isLoading ? (
        <div>loading...</div>
      ) : userPick.data.length === 0 ? (
        <div>찜한 목록이 없습니다.</div>
      ) : (
        userPick.data.map((e, i) => (
          <img key={i} src={e.info[1]} alt="poster" />
        ))
      )}
    </div>
  );
};

const Button = styled.button`
  color: ${({ theme }) => theme.color.font};
  ${({ theme }) => theme.font.small}
  background: none;
  border: none;
  cursor: pointer;
`;
export default MyPage;
