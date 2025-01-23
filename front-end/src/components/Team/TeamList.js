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

      <div>
      <h2>Teams</h2>
      {checkRole('ROLE_PLAYER') && <Link to='/team/create' >Create a team</Link>}
      <ul>
        {teams.map(team => (
          <li key={team.id}>
            {team.name}

            {(user == team.creator_id || checkRole()) &&
              <Link to={"/team/" + team.id + '/query'} className='mx-2'>Queries</Link> }            
            <Link to={"/team/" + team.id} className='mx-2'>Info</Link> 
            {(user == team.creator_id || checkRole()) &&
             <button onClick={() => handleDelete(team.id)} className='mx-2'>Delete</button>}
          </li>
        ))}
      </ul>
    </div>
    </div>
  )
};

export default TeamList;
