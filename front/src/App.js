
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
              <Route path="/signup" element={<UserForm />} />
              <Route path="/login" element={<UserForm />} />
            </Routes>
          </div>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;

