
import { GlobalStyle } from "./styles/GlobalStyle";
import { useEffect } from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import Main from './Pages/Main/Main';
import Survey from './Pages/Survey/Survey';
import SurveyResult from './Pages/SurveyResult/SurveyResult';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import Detail from './Pages/Detail/Detail';
import { QueryClient, QueryClientProvider } from 'react-query';
import Signup from './Pages/Signup/Signup';
import Login from './Pages/Login/Login';

function App() {
  const queryClient = new QueryClient()
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
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;

