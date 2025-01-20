import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTournament } from '../../redux/actions/tournamentActions.js';
import { useNavigate } from 'react-router-dom';
import Error from '../Error.js'

const TournamentForm = () => {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const dispatch = useDispatch();
  const errorBody = useSelector(state => state.error.body);
  let response
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    response = await dispatch(createTournament({ title: title, start_date: startDate, end_date: endDate }));
    //console.log(response)
    setTitle('');
    setStartDate('');
    setEndDate('');

    if (!response.error) { 
      navigate('/'); 
    }
  };

  return (
    <div>
      <Error body={errorBody}/>

      <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <input
        type="text"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        placeholder="Start Date"
        required
      />
      <input
        type="text"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        placeholder="End Date"
        required
      />
      <button type="submit">Create</button>
    </form>
    </div>

  );
};

export default TournamentForm;
