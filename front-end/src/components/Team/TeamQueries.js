import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteQueryMember,  fetchQueriesMembers, fetchMembers  } from '../../redux/actions/queryActions.js';
import Error from '../Error.js'
import { useNavigate } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';

const TeamQueries = () => {
  const params = useParams()

  const dispatch = useDispatch();
  const queries = useSelector(state => state.query.memberQueries);
  const queryMembers = useSelector(state => state.query.members);
  const error = useSelector(state => state.error.body);
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchQueriesMembers(params.id));
    dispatch(fetchMembers(params.id));
  }, [dispatch]);

  useEffect(() => {           //назад возвращать??
    if(error ) navigate('/team')
  }, [error]);

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
            {queryMembers && queryMembers.find(member => member.id == query.user_id).name}
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
