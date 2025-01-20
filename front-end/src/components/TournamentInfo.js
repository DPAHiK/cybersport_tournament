import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEngagedTeams, fetchMatches, fetchTournamentById } from '../redux/actions/tournamentActions.js';
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

  matches.sort((a, b) => {
    const aDate = new Date(a.start_date)
    const bDate = new Date(b.start_date)
    //console.log(aDate.getTime() - bDate.getTime())
    return aDate.getTime() - bDate.getTime()})
//    console.log(params.id)
    // console.log(engagedTeams)
    // console.log(matches)

  if(tournament) return (
    <div>
      <Error body={error}/>

      <div>
        <h2>{tournament.title}</h2>
        <h2>Teams</h2>
        {engagedTeams && engagedTeams.map(team => (
          <li key={team.id}>
            {team.name}
          </li>
        ))}    
        <h2>Matches</h2>
        <div className='container mt-5'>
          <div className='row'>
            {matches && matches.map(match => (
            <div className='col col-lg-2 border border-secondary mx-5' key={match.id}>
              <h4 className="mb-0 text-center">
              {engagedTeams.find(team => team.team_id == match.team1_id) &&
              engagedTeams.find(team => team.team_id == match.team1_id).name}
              </h4>

              <h6 className="my-2 text-center">vs</h6>

              <h4 className="mb-0 text-center">
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
