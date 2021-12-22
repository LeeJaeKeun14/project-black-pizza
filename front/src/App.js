
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import Main from './Pages/Main';
import Survey from './Pages/Survey';
import SurveyResult from './Pages/SurveyResult';
import { Link } from 'react-router-dom';

function App() {
  const [msg, setMsg] = useState("이 글자가 보인다면 api서버와 연결이 안된 겁니다.");
  useEffect(() => {
    axios('/api').then(res => setMsg(res.data)).catch(console.log);
  }, [])
  return (
    <div className="App">
      <p>
        {msg}
      </p>
      <div>
        <Link to='/'>main</Link>
        <Link to='/survey'>survey</Link>
        <Link to='/result'>result</Link>
      </div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/result" element={<SurveyResult />} />
      </Routes>

    </div>
  );
}

export default App;

