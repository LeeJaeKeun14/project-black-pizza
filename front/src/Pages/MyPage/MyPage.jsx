import React from "react";
import { useNavigate } from "react-router";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { logout } from "../../api/user";
import Header from "../../Components/Header/Header";
import { useUserPick } from "../../hooks/userPick";
import { loginState } from "../../store/atoms";

const MyPage = props => {
  const setIsLogin = useSetRecoilState(loginState);
  const navigator = useNavigate();
  const userPick = useUserPick();

  const logoutHandler = async () => {
    await logout().then(res => {
      if (res.status === 200) {
        setIsLogin(false);
        navigator("/");
      }
    });
  };
  return (
    <div>
      <Header />
      <Button onClick={logoutHandler}>로그아웃</Button>
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
