import React from 'react';
import TeamList from './components/Team/TeamList.js';
import TeamForm from './components/Team/TeamForm.js';
import Login from './components/Login.js';
import {  useDispatch, useSelector } from 'react-redux';
import { logout } from './redux/actions/authActions.js';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Signup from './components/Signup.js';
import TournamentList from './components/Tournament/TournamentList.js';
import TeamInfo from './components/Team/TeamInfo.js';
import TournamentForm from './components/Tournament/TournamentForm.js';
import TournamentInfo from './components/Tournament/TournamentInfo.js';
import TournamentQueries from './components/Tournament/TournamentQueries.js';
import TeamApplyQuery from './components/Team/TeamApplyQuery.js';
import TeamQueries from './components/Team/TeamQueries.js';


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
        <Route path=":id/apply" element={<TeamApplyQuery/>} />
        <Route path=":id/query" element={<TeamQueries/>} />
      </Route>
      <Route path="/" >
        <Route index element={<TournamentList/>} />
      </Route>
      <Route path="/tournament" >
      <Route path="create" element={<TournamentForm/>} />
      <Route path=":id" element={<TournamentInfo/>} />
      <Route path=":id/query" element={<TournamentQueries/>} />
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
    <nav className="p-3 bg-dark text-white">

    <div className="container">
      <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">

        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li><Link to="/" className="nav-link px-2 text-secondary">Main</Link></li>
          <li><Link to="/team" className="nav-link px-2 text-white">Teams</Link></li>
        </ul>


        <div className="text-end">
          <button type="button" className="btn btn-primary me-2">
            <Link to="/login" onClick={logoutHandle} className="nav-link px-2 text-white">Logout</Link>
          </button>
        </div>
      </div>
    </div>

    </nav>
  )

  return (    
    <nav className="p-3 bg-dark text-white">

    <div className="container">
      <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">

        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li><Link to="/" className="nav-link px-2 text-secondary">Main</Link></li>
          <li><Link to="/team" className="nav-link px-2 text-white">Teams</Link></li>
        </ul>


        <div className="text-end">
          <button type="button" className="btn  me-2">
            <Link to="/login" className="nav-link px-2 text-white">Login</Link>
          </button>
          <button type="button" className="btn btn-primary me-2">
            <Link to="/signup" className="nav-link px-2 text-white">Signup</Link>
          </button>
        </div>
      </div>
    </div>

    </nav>
    )
}

export default App;
