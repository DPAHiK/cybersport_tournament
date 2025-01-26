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

  //console.log(matches)
  //console.log(engagedTeams)

  if(tournament) return (
    <div>
      <Error body={error}/>

      <div className='container mt-2'>
        <h2 className='m-2'>{tournament.title}</h2>  
        <div className='container match-container'>
          <Link to='result'>
            <button className="btn btn-outline-dark btn-lg m-2">
              Results
            </button>
          </Link>

          <div className='row match-row'>
            {highGridMatches[0] && <div className='align-self-center col-2 ' style={{fontSize: '1.25em'}}>High grid:</div>}
            {highGridMatches && highGridMatches.map(match => (
            match.team1_id && match.team2_id &&
            <MatchElement match={match} engagedTeams={engagedTeams} key={match.id}/>
            ))}
          </div>

          <div className='row match-row'>
            {lastMatches[0] && <div className='align-self-center col-2 ' style={{fontSize: '1.25em'}}>Final:</div>}
            {highGridMatches && highGridMatches.map(match => (
            <div className='col col-lg-2 border-white border-secondary mx-5' key={match.id + 'blank'}/>
            ))}

            {lastMatches && lastMatches.map(match => (

            <MatchElement match={match} engagedTeams={engagedTeams} key={match.id}/>
            ))}
          </div>

          <div className='row match-row'>
            {lowGridMatches[0] && <div className='align-self-center col-2 ' style={{fontSize: '1.25em'}}>Low grid:</div>}
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
