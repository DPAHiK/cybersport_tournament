import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTeam } from '../redux/actions/teamActions.js';
import { useNavigate } from 'react-router-dom';
import Error from './Error.js'

const TeamForm = () => {
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const errorBody = useSelector(state => state.error.body);
  let response
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    response = await dispatch(createTeam({ name }));
    console.log(response)
    setName('');

    if (!response.error) { 
      navigate('/team/' + response.id); 
    }
  };

  return (
    <div>
      <Error body={errorBody}/>

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
