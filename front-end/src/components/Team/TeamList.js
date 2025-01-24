import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeams, removeTeam } from '../../redux/actions/teamActions.js';
import Error from '../Error.js'
import { Link } from 'react-router-dom';
import {checkRole } from '../check.js';

const TeamList = () => {
  const dispatch = useDispatch();
  const teams = useSelector(state => state.team.teams);
  const error = useSelector(state => state.error.body);


  useEffect(() => {
    dispatch(fetchTeams());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(removeTeam(id));
  };


  const user = sessionStorage.getItem('user')

  return (
    <div>
      <Error body={error}/>

      <div className='container mt-2'>
        <h2 className='text-dark m-2'>Teams</h2>
        {checkRole('ROLE_PLAYER') && 
        <Link to='/team/create' >
          <button className="btn btn-outline-dark btn-lg px-3 m-2">
            Create a team
          </button>
        </Link>}


          {teams.map(team => (
            <div key={team.id} className='row align-items-center '>
              <div className='col ' style={{fontSize: '1.25em'}}>{team.name}</div>

              <div className='col text-end'>

              {(user == team.creator_id || checkRole()) &&
                <Link to={"/team/" + team.id + '/query'} className='mx-2'>
                  <button className="btn btn-outline-dark btn-lg px-3 m-2">
                    Queries
                  </button>
                </Link> }            
              <Link to={"/team/" + team.id} className='mx-2'>
                <button className="btn btn-outline-dark btn-lg px-4 m-2">
                  Info
                </button>
              </Link> 
              {(user == team.creator_id || checkRole()) &&
              <button onClick={() => handleDelete(team.id)} className="btn btn-outline-dark btn-lg px-3 m-2">Delete</button>}

              </div>
            </div>
          ))}

      </div>
    
    </div>
  )
};

export default TeamList;
