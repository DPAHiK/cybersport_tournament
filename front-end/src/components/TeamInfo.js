import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeams, removeTeam } from '../redux/actions/teamActions.js';
import Error from './Error.js'
import { Link, useParams } from 'react-router-dom';

const TeamInfo = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTeams());
  }, [dispatch]);

  const params = useParams()
  const team = useSelector(state => state.team.teams).filter(team => team.id == params.id)[0];
  const error = useSelector(state => state.error.body);

//   console.log(params.id)
//   console.log(team)

  return (
    <div>
      <Error body={error}/>

      <div>
      <h2>{team.name}</h2>

    </div>
    </div>
  )
};

export default TeamInfo;
