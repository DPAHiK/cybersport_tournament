import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEngagedTeams, fetchTournamentById } from '../redux/actions/tournamentActions.js';
import Error from './Error.js'
import { Link, useParams } from 'react-router-dom';

const TournamentInfo = () => {

  const params = useParams()

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTournamentById(params.id));
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchEngagedTeams(params.id));
  }, [dispatch]);

  const tournament = useSelector(state => state.tournament.tournamentUnique)
  const engagedTeams = useSelector(state => state.tournament.engagedTeams)
  const error = useSelector(state => state.error.body);

//    console.log(params.id)
//    console.log(engagedTeams)

  if(tournament) return (
    <div>
      <Error body={error}/>

      <div>
        <h2>{tournament.title}</h2>
        {engagedTeams && engagedTeams.map(team => (
          <li key={team.id}>
            {team.name}
          </li>
        ))}    
      </div>
    </div>
  )
};

export default TournamentInfo;
