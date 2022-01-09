
import { useSetRecoilState } from 'recoil';
import { isLogin } from '../api/user';
import { loginState } from '../store/atoms';

export const useAuth = () => {
  const setIsLogin = useSetRecoilState(loginState);

  const auth = async () => {
    const { status } = await isLogin();
    if (status === 200) {
      setIsLogin(true)
    }
    else {
      setIsLogin(false)
    }
  }
  return auth;
}
