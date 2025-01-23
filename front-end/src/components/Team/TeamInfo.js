import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeamById, fetchTeamMembers } from '../../redux/actions/teamActions.js';
import { createQueryMember } from '../../redux/actions/queryActions.js';
import Error from '../Error.js'
import { Link, useParams } from 'react-router-dom';

const TeamInfo = () => {



  const params = useParams()

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTeamById(params.id));
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchTeamMembers(params.id));
  }, [dispatch]);

  const team = useSelector(state => state.team.teamUnique)
  const teamMembers = useSelector(state => state.team.teamMembers)
  const error = useSelector(state => state.error.body);
  const user = sessionStorage.getItem('user')

//    console.log(params.id)
 //   console.log(teamMembers)

 const handleApply = (id) => {
  dispatch(createQueryMember({team_id: id, sending_date: Date()}));
};

  if(team) return (
    <div>
      <Error body={error}/>

      <div>
      <h2>{team.name}</h2>
      <Link to={`/team/${params.id}/apply`} className='mx-2'>Apply a query</Link>
      {teamMembers && !teamMembers.find(item => item.user_id == user) &&
        <button onClick={() => handleApply(team.id)} className='mx-2'>Query for join</button> }      
      <ul>
        {teamMembers && teamMembers.map(member => (
          <li key={member.id}>
            {member.name}
          </li>
        ))}
      </ul>      

    </div>
    </div>
  )
};

export default TeamInfo;
