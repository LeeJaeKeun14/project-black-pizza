
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

function App() {
  useEffect(() => {
    axios('/api').then(res => {
      console.log(res.data);
    }).catch(console.log);
  }, [])
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <div className="App">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/survey" element={<Survey />} />
            <Route path="/result" element={<SurveyResult />} />
            <Route path="/detail/:id" element={<Detail />} />
          </Routes>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;

