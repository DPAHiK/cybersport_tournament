import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeams, removeTeam } from '../redux/actions.js';

const TeamList = () => {
  const dispatch = useDispatch();
  const teams = useSelector(state => state.teams);

  useEffect(() => {
    dispatch(fetchTeams());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(removeTeam(id));
  };

  return (
    <div>
      <h2>Команды</h2>
      <ul>
        {teams.map(team => (
          <li key={team.id}>
            {team.name} <button onClick={() => handleDelete(team.id)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamList;
