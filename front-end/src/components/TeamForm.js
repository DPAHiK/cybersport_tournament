import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTeam, editTeam } from '../redux/actions.js';

const TeamForm = ({ team }) => {
  const [name, setName] = useState(team ? team.name : '');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (team) {
      dispatch(editTeam({ ...team, name }));
    } else {
      dispatch(createTeam({ name }));
    }
    setName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Название команды"
        required
      />
      <button type="submit">{team ? 'Изменить' : 'Создать'}</button>
    </form>
  );
};

export default TeamForm;
