
import { GlobalStyle } from "./styles/GlobalStyle";
import { Route, Routes } from 'react-router-dom';
import Main from './Pages/Main/Main';
import Survey from './Pages/Survey/Survey';
import SurveyResult from './Pages/SurveyResult/SurveyResult';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import Detail from './Pages/Detail/Detail';
import { QueryClient, QueryClientProvider, useQueries, useQuery } from 'react-query';
import UserForm from './Components/UserForm/UserForm';

import Test from "./Pages/Main/Test";

import { useEffect } from 'react';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { loginState } from './store/atoms';
import SignupForm from './Pages/Signup/SignupForm';
import LoginForm from './Pages/Login/LoginForm';


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
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <div className="App">
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/survey" element={<Survey />} />
              <Route path="/result" element={<SurveyResult />} />
              <Route path="/detail/:id" element={<Detail />} />

              <Route path="/signup" element={<UserForm  ><SignupForm /></UserForm>} />
              <Route path="/login" element={<UserForm ><LoginForm /></UserForm>} />
              <Route path="/test" element={<Test />} />

            </Routes>
          </div>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;

