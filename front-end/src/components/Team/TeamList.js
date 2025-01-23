import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeams, removeTeam } from '../../redux/actions/teamActions.js';
import Error from '../Error.js'
import { Link } from 'react-router-dom';
import { createQueryMember } from '../../redux/actions/queryActions.js';

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

  const handleApply = (id) => {
    dispatch(createQueryMember({team_id: id, sending_date: Date()}));
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
            <button onClick={() => handleApply(team.id)} className='mx-2'>Query for join</button>
            <Link to={"/team/" + team.id + '/query'} className='mx-2'>Queries</Link> 
            <Link to={"/team/" + team.id} className='mx-2'>Info</Link> 
            <button onClick={() => handleDelete(team.id)} className='mx-2'>Delete</button>
          </li>
        ))}
      </ul>
    </div>
    </div>
  )
};

export default TeamList;
