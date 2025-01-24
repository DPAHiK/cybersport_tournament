import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEngagedTeams, fetchMatches, fetchTournamentById } from '../../redux/actions/tournamentActions.js';
import Error from '../Error.js'
import { Link, useParams } from 'react-router-dom';
import MatchElement from './MatchElement.js';
import TournamentResults from './TournamentResults.js';

const TournamentInfo = () => {

  const params = useParams()

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTournamentById(params.id));
    dispatch(fetchEngagedTeams(params.id));
    dispatch(fetchMatches(params.id));
  }, [dispatch]);

  const tournament = useSelector(state => state.tournament.tournamentUnique)
  const engagedTeams = useSelector(state => state.tournament.engagedTeams)
  const matches = useSelector(state => state.tournament.matches)
  const error = useSelector(state => state.error.body);

  const highGridMatches = matches.filter(match => match.grid_level == 2)
  const lowGridMatches = matches.filter(match => match.grid_level == 1)
  const lastMatches = matches.filter(match => match.grid_level == 0)


  if(tournament) return (
    <div>
      <Error body={error}/>

      <div>
        <h2>{tournament.title}</h2>  
        <div className='container mt-5'>
          <Link to='result'>Results</Link>
          <div className='row'>
            {highGridMatches[0] && <div className='align-self-center col-md-auto '>High grid:</div>}
            {highGridMatches && highGridMatches.map(match => (
            
            <MatchElement match={match} engagedTeams={engagedTeams} key={match.id}/>
            ))}
          </div>

          <div className='row'>
            {lastMatches[0] && <div className='align-self-center col-md-auto '>Final:</div>}
            {highGridMatches && highGridMatches.map(match => (
            <div className='col col-lg-2 border-white border-secondary mx-5' key={match.id + 'blank'}/>
            ))}

            {lastMatches && lastMatches.map(match => (

            <MatchElement match={match} engagedTeams={engagedTeams} key={match.id}/>
            ))}
          </div>

          <div className='row'>
            {lowGridMatches[0] && <div className='align-self-center col-md-auto '>Low grid:</div>}
            {lowGridMatches && lowGridMatches.map(match => (

            <MatchElement match={match} engagedTeams={engagedTeams} key={match.id}/>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
 
};

export default TournamentInfo;
