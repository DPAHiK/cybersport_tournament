import React, { useEffect } from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import {  fetchMatches, fetchEngagedTeams, fetchTournamentById, updateMatch, removeMatch } from '../../redux/actions/tournamentActions.js';
import Error from '../Error.js'
import { Link, useParams } from 'react-router-dom';
import { checkRole, formatDate } from '../check.js';

const MatchInfo = () => {

 const params = useParams()
 const dispatch = useDispatch()

 const tournament = useSelector(state => state.tournament.tournamentUnique)
 const engagedTeams = useSelector(state => state.tournament.engagedTeams)
 const error = useSelector(state => state.error.body);
 const user = sessionStorage.getItem('user')
 const match = useSelector(state => state.tournament.matches).filter(item => item.id == params.matchId)[0]

   useEffect(() => {
    dispatch(fetchTournamentById(params.id));
    dispatch(fetchEngagedTeams(params.id));
    dispatch(fetchMatches(params.id));
   }, [dispatch]);

   function setTeamNameColor(isTeam1Winner, teamNumber){
    //console.log(isTeamWinner)
    if(isTeam1Winner === null)return "mb-0 text-center"
    if(isTeam1Winner === true && teamNumber === 1) return "mb-0 text-center text-success"
    if(isTeam1Winner === false && teamNumber === 2) return "mb-0 text-center text-success"
    return "mb-0 text-center text-danger"
  }

  function handleWinner(isTeam1Winner){
    dispatch(updateMatch(match.id, {...match, is_team1_winner: isTeam1Winner}))
    
  }

  function handleDelete(){
    dispatch(removeMatch(match.id))
    
  }

 if(tournament && tournament.organizer_id == user || checkRole())return (
    <div className='container align-self-center mt-5 '>
      <Error body={error}/>


      <div className='row'>
        <Link to={`/tournament/${params.id}`} className='col text-start'>
          <button className='btn btn-outline-dark btn-lg m-3'>
            Back
          </button>
        </Link>
      </div>
      
      <div className='row justify-content-center'>


        {match && engagedTeams &&
        <div className='col col-lg-2 text-center' >
          <h4 className={setTeamNameColor(match.is_team1_winner, 1)}>
          {engagedTeams.find(team => team.team_id == match.team1_id) &&
          engagedTeams.find(team => team.team_id == match.team1_id).name}
          </h4>
          <button className="btn btn-outline-dark btn-lg m-3" onClick={() => handleWinner(true)}>Winner</button>

        </div>
        }

        {match && engagedTeams &&
        <div className='col col-lg-3 text-center align-items-center' >
            <h6 className="my-2">vs</h6>

            <p className="mt-3">{formatDate(match.start_date) + " - " + formatDate(match.end_date)}</p>
            <Link to={`/tournament/${params.id}`}>
              <button className="btn btn-outline-danger btn-lg m-3" onClick={() => handleDelete()}>Delete</button>
            </Link>
            
        </div>
        }

        {match && engagedTeams &&
        <div className='col col-lg-2 text-center' >
            <h4 className={setTeamNameColor(match.is_team1_winner, 2)}>
            {engagedTeams.find(team => team.team_id == match.team2_id) &&
            engagedTeams.find(team => team.team_id == match.team2_id).name}
            </h4>
            <button className="btn btn-outline-dark btn-lg m-3" onClick={() => handleWinner(false)}>Winner</button>

        </div>
        }

      </div>
      

    </div>
  )

  if(match && engagedTeams) return (
    <div className='container align-self-center mt-5 '>
      <Error body={error}/>


      <div className='row'>
        <Link to={`/tournament/${params.id}`} className='col text-start'>
          <button className='btn btn-outline-dark btn-lg m-3'>
            Back
          </button>
        </Link>
      </div>
      
      <div className='row justify-content-center'>


        {match && engagedTeams &&
        <div className='col col-lg-2 text-center' >
          <h4 className={setTeamNameColor(match.is_team1_winner, 1)}>
          {engagedTeams.find(team => team.team_id == match.team1_id) &&
          engagedTeams.find(team => team.team_id == match.team1_id).name}
          </h4>

        </div>
        }

        {match && engagedTeams &&
        <div className='col col-lg-3 text-center align-items-center' >
            <h6 className="my-2">vs</h6>

            <p className="mt-3">{formatDate(match.start_date) + " - " + formatDate(match.end_date)}</p>
            
        </div>
        }

        {match && engagedTeams &&
        <div className='col col-lg-2 text-center' >
            <h4 className={setTeamNameColor(match.is_team1_winner, 2)}>
            {engagedTeams.find(team => team.team_id == match.team2_id) &&
            engagedTeams.find(team => team.team_id == match.team2_id).name}
            </h4>

        </div>
        }

      </div>
      

    </div>
  )
};

export default MatchInfo;
