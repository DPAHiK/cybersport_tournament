import React from 'react';
import TeamList from './components/TeamList.js';
import TeamForm from './components/TeamForm.js';
import Login from './components/Login.js';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';


const App = () => {
  return (
    <Router>
    <nav>
      <ul>
        <li><Link to="/">Главная</Link></li>
        <li><Link to="/team">Команды</Link></li>
        <li><Link to="/login">Войти</Link></li>
      </ul>
    </nav>

    <Routes>
      <Route path="/" element={<TeamForm/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/team" >
        <Route index element={<TeamList/>} />
       
      </Route>  
    </Routes>
  </Router> 
  );
};

export default App;
