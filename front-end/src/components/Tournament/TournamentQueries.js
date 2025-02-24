import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editQuery, fetchQueries, fetchQueryTeams,   } from '../../redux/actions/queryActions.js';
import { generateGrid, fetchTournamentById } from '../../redux/actions/tournamentActions.js';
import Error from '../Error.js'
import { Link, useParams, useNavigate } from 'react-router-dom';

const TournamentQueries = () => {
  const params = useParams()
  const navigate = useNavigate()

  const dispatch = useDispatch();
  const queries = useSelector(state => state.query.queries);
  const queryTeams = useSelector(state => state.query.queryTeams);
  const error = useSelector(state => state.error.body);
  const tournament = useSelector(state => state.tournament.tournamentUnique)

  useEffect(() => {
    dispatch(fetchTournamentById(params.id));    
    dispatch(fetchQueries(params.id));
    dispatch(fetchQueryTeams(params.id));
  }, [dispatch]);

  function handleUpdateQuery(id, tournamentId, body){
     dispatch(editQuery(id, tournamentId, body))
  }

  async function handleBeginTournament(){
    const result = await dispatch(generateGrid(params.id))

    //console.log(result)
    if(result.message) navigate(`/tournament/${params.id}`)
  }

//console.log(queryTeams)
  return (
    <div>
      <Error body={error}/>

      <div className='container mt-2' >
        <h2 className='text-dark m-2'>Queries</h2>

        <Link to='/' className='col text-start'>
          <button className='btn btn-outline-dark btn-lg m-3'>
            Back
          </button>
        </Link>
        {tournament && !tournament.is_began && queries.filter(item => item.status == true).length > 1 &&
          <button onClick={() => {handleBeginTournament()}} className="btn btn-outline-dark btn-lg px-3 m-2">
            Begin tournament
          </button>
        }

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
              query.status === false ?
              <div className='col text-danger' style={{fontSize: '1.25em'}}>
              Denied
              </div>
              :
              <div className='col text-secondary' style={{fontSize: '1.25em'}}>
              Not considered
              </div>
              }   

              { tournament && !tournament.is_began &&
                <div className='col text-end'>
                <button onClick={() => handleUpdateQuery(query.id, query.tournament_id, {...query, status: true})} className="btn btn-outline-success btn-lg px-4 m-2">Accept</button>
                <button onClick={() => handleUpdateQuery(query.id, query.tournament_id, {...query, status: false})} className="btn btn-outline-danger btn-lg px-4 m-2">Deny</button>
              </div>
              }
            </div>
          ))}



      </div>
    </div>
  )
};

export default TournamentQueries;
