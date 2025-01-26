import React from 'react';
import { Link } from 'react-router-dom';

const MatchElement = (props) => {

    const engagedTeams = props.engagedTeams
    const match = props.match

    function setTeamNameColor(isTeam1Winner, teamNumber){
        //console.log(isTeamWinner)
        if(isTeam1Winner === null) return "mb-0 text-center"
        if(isTeam1Winner === true && teamNumber === 1) return "mb-0 text-center text-success"
        if(isTeam1Winner === false && teamNumber === 2) return "mb-0 text-center text-success"
        return "mb-0 text-center text-danger"
      }

  return (
    
    <div className='col col-lg-2 border border-secondary mx-5' >
    <h4 className={setTeamNameColor(match.is_team1_winner, 1)}>
    {engagedTeams.find(team => team.team_id == match.team1_id) &&
    engagedTeams.find(team => team.team_id == match.team1_id).name}
    </h4>

    <h6 className="my-2 text-center">vs</h6>

    <h4 className={setTeamNameColor(match.is_team1_winner, 2)}>
    {engagedTeams.find(team => team.team_id == match.team2_id) &&
    engagedTeams.find(team => team.team_id == match.team2_id).name}
    </h4>


    <p className="mt-3 text-center">
      <Link to={`match/${match.id}`}>
        <button className="btn btn-outline-dark btn-lg px-3">
          Info
        </button>
      </Link>
      </p>
  
  </div>

  )
};

export default MatchElement;
