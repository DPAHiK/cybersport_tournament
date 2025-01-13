import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeamById, fetchTeamMembers } from '../redux/actions/teamActions.js';
import Error from './Error.js'
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

//    console.log(params.id)
    //console.log(teamMembers)

  if(team) return (
    <div>
      <Error body={error}/>

      <div>
      <h2>{team.name}</h2>
      <ul>
        {teamMembers && teamMembers.map(member => (
          <li key={member.id}>
            {member.user_id}
          </li>
        ))}
      </ul>      

    </div>
    </div>
  )
};

export default TeamInfo;
