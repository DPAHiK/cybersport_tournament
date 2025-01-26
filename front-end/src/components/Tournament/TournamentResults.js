import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchResults, fetchEngagedTeams, fetchTournamentById  } from '../../redux/actions/tournamentActions.js';
import Error from '../Error.js'
import { Link, useParams } from 'react-router-dom';

const TournamentResults = () => {
  const params = useParams()

  const dispatch = useDispatch();
  const results = useSelector(state => state.tournament.results);
  const engagedTeams = useSelector(state => state.tournament.engagedTeams)
  const tournament = useSelector(state => state.tournament.tournamentUnique)
  const error = useSelector(state => state.error.body);

  useEffect(() => {
    dispatch(fetchTournamentById(params.id));
    dispatch(fetchResults(params.id));
    dispatch(fetchEngagedTeams(params.id));
  }, [dispatch]);



//console.log(queryTeams)
  return (
    <div>
      <Error body={error}/>

      <div className='container mt-2'>
        <h2 className='m-2'>Results of {tournament && tournament.title}</h2>
        
          {results &&  results.map(result => (
            <div key={result.id} className='row align-items-center border border-secondary mt-3'>
              <div className='col ' style={{fontSize: '1.5em'}}>
                { "Place " + result.place }
              </div>
              <div className='col ' style={{fontSize: '1.5em'}}>
                {engagedTeams && engagedTeams.length && engagedTeams.find(item => item.team_id == result.team_id).name}
              </div>
            </div>
          ))}


      </div>
    </div>
  )
};

export default TournamentResults;
