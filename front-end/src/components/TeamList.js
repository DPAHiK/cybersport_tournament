import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeams, removeTeam } from '../redux/actions/teamActions.js';
import Error from './Error.js'
import { Link } from 'react-router-dom';

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
  return (
    <div>
      <Error body={error}/>

      <div>
      <h2>Teams</h2>
      <Link to='/team/create' >Create a team</Link>
      <ul>
        {teams.map(team => (
          <li key={team.id}>
            {team.name}
            <Link to={"/team/" + team.id}>Info</Link> 
            <button onClick={() => handleDelete(team.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
    </div>
  )
};

export default TeamList;
