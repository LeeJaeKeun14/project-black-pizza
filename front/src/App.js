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
import SignupForm from './Pages/Signup/SignupForm';
import LoginForm from './Pages/Login/LoginForm';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import MyPage from './Pages/MyPage/MyPage';
import Description from './Pages/Description/Description';
import { useAuth } from './hooks/useAuth';

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  })
  const auth = useAuth();
  useEffect(() => {
    auth()
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <div className="App">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/survey" element={<PrivateRoute redirectTo="/login"><Survey /></PrivateRoute>} />
            <Route path="/result" element={<SurveyResult />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/signup" element={<UserForm  ><SignupForm /></UserForm>} />
            <Route path="/login" element={<UserForm ><LoginForm /></UserForm>} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/description" element={<Description />} />
            <Route path="/test" element={<Test />} />
          </Routes>
        </div>
      </ThemeProvider>
    </QueryClientProvider>

  );
}

export default App;

