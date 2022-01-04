
import { GlobalStyle } from "./styles/GlobalStyle";
import { Route, Routes } from 'react-router-dom';
import Main from './Pages/Main/Main';
import Survey from './Pages/Survey/Survey';
import SurveyResult from './Pages/SurveyResult/SurveyResult';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import Detail from './Pages/Detail/Detail';
import { QueryClient, QueryClientProvider } from 'react-query';
import UserForm from './Components/UserForm/UserForm';

import Test from "./Pages/Main/Test";

import { useEffect } from 'react';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { loginState } from './store/atoms';
import SignupForm from './Pages/Signup/SignupForm';
import LoginForm from './Pages/Login/LoginForm';
import { ReactQueryDevtools } from 'react-query/devtools'
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import MyPage from './Pages/MyPage/MyPage';


function App() {
  const queryClient = new QueryClient()
  const setIsLogin = useSetRecoilState(loginState);
  const auth = async () => {

    const res = await axios.get("/api/user/isSignin").then(res => res.data.status)
    if (res === 200) {
      setIsLogin(true)
    }
    else {
      setIsLogin(false)
    }
  }

  useEffect(() => {
    auth()
  }, []);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <div className="App">
            <Routes>
              <Route path="/" element={<Main />} />
              {/* <Route path="/survey" element={<Survey />} /> */}
              <Route path="/survey" element={<PrivateRoute redirectTo="/login"><Survey /></PrivateRoute>} />
              <Route path="/result" element={<SurveyResult />} />
              <Route path="/detail/:id" element={<Detail />} />

              <Route path="/signup" element={<UserForm  ><SignupForm /></UserForm>} />
              <Route path="/login" element={<UserForm ><LoginForm /></UserForm>} />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/test" element={<Test />} />

            </Routes>
          </div>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;

