import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEngagedTeams, fetchMatches, fetchTournamentById } from '../../redux/actions/tournamentActions.js';
import Error from '../Error.js'
import { Link, useParams } from 'react-router-dom';
import MatchElement from './MatchElement.js';

const TournamentInfo = () => {

  const params = useParams()

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTournamentById(params.id));
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchEngagedTeams(params.id));
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchMatches(params.id));
  }, [dispatch]);

  const tournament = useSelector(state => state.tournament.tournamentUnique)
  const engagedTeams = useSelector(state => state.tournament.engagedTeams)
  const matches = useSelector(state => state.tournament.matches)
  const error = useSelector(state => state.error.body);

  const highGridMatches = matches.filter(match => match.grid_level == 2)
  const lowGridMatches = matches.filter(match => match.grid_level == 1)
  const lastMatches = matches.filter(match => match.grid_level == 0)

  function setTeamNameColor(isTeam1Winner, teamNumber){
    //console.log(isTeamWinner)
    if(isTeam1Winner === null)return "mb-0 text-center"
    if(isTeam1Winner === true && teamNumber === 1) return "mb-0 text-center text-success"
    if(isTeam1Winner === false && teamNumber === 2) return "mb-0 text-center text-success"
    return "mb-0 text-center text-danger"
  }

  if(tournament) return (
    <div>
      <Error body={error}/>

      <div>
        <h2>{tournament.title}</h2>  
        <div className='container mt-5'>
          <div className='row'>
            {highGridMatches[0] && <div className='align-self-center col-md-auto '>High grid:</div>}
            {highGridMatches && highGridMatches.map(match => (
            
            <MatchElement match={match} engagedTeams={engagedTeams}/>
            ))}
          </div>

          <div className='row'>
            {lastMatches[0] && <div className='align-self-center col-md-auto '>Final:</div>}
            {highGridMatches && highGridMatches.map(match => (
            <div className='col col-lg-2 border-white border-secondary mx-5' key={match.id}/>
            ))}

            {lastMatches && lastMatches.map(match => (
            <div className='col col-lg-2 border border-secondary mx-5 my-5' key={match.id}>
              <h4 className={setTeamNameColor(match.is_team1_winner, 1)}>
              {engagedTeams.find(team => team.team_id == match.team1_id) &&
              engagedTeams.find(team => team.team_id == match.team1_id).name}
              </h4>

              <h6 className="my-2 text-center">vs</h6>

              <h4 className={setTeamNameColor(match.is_team1_winner, 2)}>
              {engagedTeams.find(team => team.team_id == match.team2_id) &&
              engagedTeams.find(team => team.team_id == match.team2_id).name}
              </h4>

              <p className="mt-3 text-center">{match.start_date}</p>
            
            </div>
            ))}
          </div>

          <div className='row'>
            {lowGridMatches[0] && <div className='align-self-center col-md-auto '>Low grid:</div>}
            {lowGridMatches && lowGridMatches.map(match => (
            <div className='col col-lg-2 border border-secondary mx-5' key={match.id}>
              <h4 className={setTeamNameColor(match.is_team1_winner, 1)}>
              {engagedTeams.find(team => team.team_id == match.team1_id) &&
              engagedTeams.find(team => team.team_id == match.team1_id).name}
              </h4>

              <h6 className="my-2 text-center">vs</h6>

              <h4 className={setTeamNameColor(match.is_team1_winner, 2)}>
              {engagedTeams.find(team => team.team_id == match.team2_id) &&
              engagedTeams.find(team => team.team_id == match.team2_id).name}
              </h4>

              <p className="mt-3 text-center">{match.start_date}</p>
            
            </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
};

export default TournamentInfo;
