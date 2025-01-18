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
        {matches && matches.map(match => (
          <li key={match.id}>
            {engagedTeams.find(team => team.team_id == match.team1_id) &&
            engagedTeams.find(team => team.team_id == match.team1_id).name}
            {" vs "}
            {engagedTeams.find(team => team.team_id == match.team2_id) &&
            engagedTeams.find(team => team.team_id == match.team2_id).name}
            {" " + match.start_date} 
          </li>
        ))} 
      </div>
    </div>
  )
};

export default TournamentInfo;
