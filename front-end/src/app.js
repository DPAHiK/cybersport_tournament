import React from 'react';
import TeamList from './components/TeamList.js';
import TeamForm from './components/TeamForm.js';
import Login from './components/Login.js';
import {  useDispatch, useSelector } from 'react-redux';
import { logout } from './redux/actions/authActions.js';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Signup from './components/Signup.js';
import TournamentList from './components/TournamentList.js';
import TeamInfo from './components/TeamInfo.js';
import TournamentForm from './components/TournamentForm.js';


const App = () => {
  return (
  <Router>
    <NavPanel/>

    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/team" >
        <Route index element={<TeamList/>} />
        <Route path="create" element={<TeamForm/>} />
        <Route path=":id" element={<TeamInfo/>} />
      </Route>
      <Route path="/" >
        <Route index element={<TournamentList/>} />
      </Route>
      <Route path="/tournament" >
      <Route path="create" element={<TournamentForm/>} />
      </Route>
    
    </Routes>
  </Router> 
  );
};

const NavPanel = () => {
  const token = useSelector(state => state.auth.token);
  //console.log(token)
  const dispatch = useDispatch();

  function logoutHandle(){
    dispatch(logout())
  }

  if(token) return (    
  <nav>
    <ul>
      <li><Link to="/">Main</Link></li>
      <li><Link to="/team">Teams</Link></li>
      <li><Link onClick={logoutHandle} to="/login">Logout</Link></li>
    </ul>
  </nav>
  )

  return (    
    <nav>
      <ul>
        <li><Link to="/">Main</Link></li>
        <li><Link to="/team">Teams</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Signup</Link></li>
      </ul>
    </nav>
    )
}

export default App;
