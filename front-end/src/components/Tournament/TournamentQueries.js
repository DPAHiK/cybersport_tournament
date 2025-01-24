import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editQuery, fetchQueries, fetchQueryTeams,   } from '../../redux/actions/queryActions.js';
import { generateGrid } from '../../redux/actions/tournamentActions.js';
import Error from '../Error.js'
import { Link, useParams } from 'react-router-dom';

const TournamentQueries = () => {
  const params = useParams()

  const dispatch = useDispatch();
  const queries = useSelector(state => state.query.queries);
  const queryTeams = useSelector(state => state.query.queryTeams);
  const error = useSelector(state => state.error.body);

  useEffect(() => {
    dispatch(fetchQueries(params.id));
    dispatch(fetchQueryTeams(params.id));
  }, [dispatch]);

  function handleUpdateQuery(id, tournamentId, body){
     dispatch(editQuery(id, tournamentId, body))
  }

  function handleBeginTournament(){
    dispatch(generateGrid(params.id))
  }

//console.log(queryTeams)
  return (
    <div>
      <Error body={error}/>

      <div className='container mt-2' >
        <h2 className='text-dark m-2'>Queries</h2>

        <Link to={`/tournament/${params.id}`} onClick={() => {handleBeginTournament()}}>
          <button className="btn btn-outline-dark btn-lg px-3 m-2">
            Begin tournament
          </button>
        </Link>

          {queries[0] && queryTeams[0] && queries.map(query => (
            <div key={query.id} className='row align-items-center '>
              <div className='col ' style={{fontSize: '1.25em'}}>
                {queryTeams.find(team => team.id == query.team_id) ? queryTeams.find(team => team.id == query.team_id).name : 'Deleted team'}
              </div>

              {query.status ? 
              <div className='col text-success' style={{fontSize: '1.25em'}}>
              Accepted
              </div>
              :
              <div className='col text-danger' style={{fontSize: '1.25em'}}>
              Denied
              </div>
              }   

              <div className='col text-end'>
                <button onClick={() => handleUpdateQuery(query.id, query.tournament_id, {...query, status: true})} className="btn btn-outline-dark btn-lg px-4 m-2">Accept</button>
                <button onClick={() => handleUpdateQuery(query.id, query.tournament_id, {...query, status: false})} className="btn btn-outline-dark btn-lg px-4 m-2">Deny</button>
              </div>
            </div>
          ))}



      </div>
    </div>
  )
};

export default TournamentQueries;
