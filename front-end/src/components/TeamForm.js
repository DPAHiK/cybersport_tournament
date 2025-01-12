import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTeam } from '../redux/actions/teamActions.js';
import Error from './Error.js'

const TeamForm = () => {
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const error = useSelector(state => state.error.body);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createTeam({ name }));
    
    setName('');
  };

  return (
    <div>
      <Error body={error}/>

      <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Team name"
        required
      />
      <button type="submit">Create</button>
    </form>
    </div>

  );
};

export default TeamForm;
