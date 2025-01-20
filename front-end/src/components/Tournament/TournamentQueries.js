import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editQuery, fetchQueries, fetchQueryTeams,   } from '../../redux/actions/queryActions.js';
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

  function handleUpdateQuery(id, body){
     dispatch(editQuery(id, body))
  }

//console.log(queryTeams)
  return (
    <div>
      <Error body={error}/>

      <div>
      <h2>Queries</h2>
      <ul>
        {queries[0] && queryTeams[0] && queries.map(query => (
          <li key={query.id}>
            {queryTeams.find(team => team.id == query.team_id).name}
            {" " + query.status}
            <button onClick={() => handleUpdateQuery(query.id, {...query, status: true})}>Accept</button>
            <button onClick={() => handleUpdateQuery(query.id, {...query, status: false})}>Deny</button>
          </li>
        ))}

      </ul>

    </div>
    </div>
  )
};

export default TournamentQueries;
