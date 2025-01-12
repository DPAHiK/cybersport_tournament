import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeamById,  } from '../redux/actions/teamActions.js';
import Error from './Error.js'
import { Link, useParams } from 'react-router-dom';

const TeamInfo = () => {

  async function fetch(){
    await useEffect(() => {
        dispatch(fetchTeamById(params.id));
      }, [dispatch]);
  }

  const params = useParams()
  const dispatch = useDispatch();
  fetch()
  const team = useSelector(state => state.team.teamUnique)
  const error = useSelector(state => state.error.body);

//    console.log(params.id)
//    console.log(team)

  if(team) return (
    <div>
      <Error body={error}/>

      <div>
      <h2>{team.name}</h2>

    </div>
    </div>
  )
};

export default TeamInfo;
