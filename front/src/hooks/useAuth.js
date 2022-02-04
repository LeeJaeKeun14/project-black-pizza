
import { useSetRecoilState } from 'recoil';
import { isLogin } from '../api/user';
import { loginState, socialLoginState } from '../store/atoms';

export const useAuth = () => {
  const setIsLogin = useSetRecoilState(loginState);
  const setIsSocialLogin = useSetRecoilState(socialLoginState);
  const auth = async () => {
    const { status, isKakao } = await isLogin();
    if (status === 200) {
      setIsLogin(true)
      if (isKakao) {
        setIsSocialLogin(true)

      } else {
        setIsSocialLogin(false);
      }
    }
    else {
      setIsLogin(false)
    }
  }
  return auth;
}
