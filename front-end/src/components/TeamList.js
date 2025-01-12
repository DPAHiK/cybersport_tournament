import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeams, removeTeam } from '../redux/actions.js';
import Error from './Error.js'

const TeamList = () => {
  const dispatch = useDispatch();
  const teams = useSelector(state => state.teams);
  const error = useSelector(state => state.error);

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
      <ul>
        {teams.map(team => (
          <li key={team.id}>
            {team.name} <button onClick={() => handleDelete(team.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
    </div>
  )
};

export default TeamList;
