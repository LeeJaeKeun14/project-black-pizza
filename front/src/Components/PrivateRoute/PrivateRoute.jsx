import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loginState } from "../../store/atoms";

const PrivateRoute = ({ children, redirectTo }) => {
  const isLogin = useRecoilValue(loginState);
  const location = useLocation();

  return isLogin ? (
    children
  ) : (
    <Navigate
      to={redirectTo}
      state={{
        from: location.pathname,
        message: "로그인이 필요한 서비스입니다.",
      }}
    />
  );
};

export default PrivateRoute;
