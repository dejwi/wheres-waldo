import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Route,Routes} from "react-router-dom";

import App from './App';
import Game from './components/Game';
import Leaderboard from "./components/Leaderboard";


ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/:level" element={<Game />} />
            <Route path="/leaderboard/:level" element={<Leaderboard />} />
        </Routes>
    </BrowserRouter>,
  document.getElementById('root')
);
