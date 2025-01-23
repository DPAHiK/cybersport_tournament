import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteQueryMember,  fetchQueriesMembers,   } from '../../redux/actions/queryActions.js';
import Error from '../Error.js'
import { Link, useParams } from 'react-router-dom';

const TeamQueries = () => {
  const params = useParams()

  const dispatch = useDispatch();
  const queries = useSelector(state => state.query.memberQueries);
  const error = useSelector(state => state.error.body);

  useEffect(() => {
    dispatch(fetchQueriesMembers(params.id));
  }, [dispatch]);

  function handleUpdateQuery(id, teamId, isAccepted){
     dispatch(deleteQueryMember(id, teamId, isAccepted))
  }


//console.log(queryTeams)
  return (
    <div>
      <Error body={error}/>

      <div>
      <h2>Queries</h2>
      <ul>
        {queries[0] && queries.map(query => (
          <li key={query.id}>
            {query.user_id}
            <button onClick={() => handleUpdateQuery(query.id, query.team_id, true)}>Accept</button>
            <button onClick={() => handleUpdateQuery(query.id, query.team_id, false)}>Deny</button>
          </li>
        ))}

      </ul>

    </div>
    </div>
  )
};

export default TeamQueries;
