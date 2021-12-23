
// import './App.css';
import { GlobalStyle } from "./styles/GlobalStyle";
import { useEffect } from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import Main from './Pages/Main/Main';
import Survey from './Pages/Survey/Survey';
import SurveyResult from './Pages/SurveyResult/SurveyResult';
import { Link } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';

function App() {
  //const [msg, setMsg] = useState("이 글자가 보인다면 api서버와 연결이 안된 겁니다.");
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
          {/* <p>
            {msg}
          </p>
          <div>
            <Link to='/'>main</Link>
            <Link to='/survey'>survey</Link>
            <Link to='/result'>result</Link>
          </div> */}
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/survey" element={<Survey />} />
            <Route path="/result" element={<SurveyResult />} />
          </Routes>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;

