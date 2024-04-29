// App.js
import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import ListofGames from './pages/ListofGames';
import Password from './pages/Password';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ListofGames />} />
          <Route path="/game" element={<Password gameEndpoint="/game/" />} />
          <Route path="/game_gpt" element={<Password gameEndpoint="/game_gpt/" />} />
          <Route path="/game_bert" element={<Password gameEndpoint="/game_bert/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;