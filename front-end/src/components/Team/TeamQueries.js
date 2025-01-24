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

  // useEffect(() => {           //назад возвращать??
  //   if(error ) navigate('/team')
  // }, [error]);

  function handleUpdateQuery(id, teamId, isAccepted){
     dispatch(deleteQueryMember(id, teamId, isAccepted))
  }


//console.log(queryTeams)
  return (
    <div>
      <Error body={error}/>

      <div className='container mt-2'>
      <h2 className='text-dark m-2'>Queries</h2>

        {queries[0] && queries.map(query => (
          <div key={query.id} className='row align-items-center '>
            <div className='col ' style={{fontSize: '1.25em'}}>
            {queryMembers && queryMembers.find(member => member.id == query.user_id).name}
            </div>

            <div className='col text-end'>
              <button onClick={() => handleUpdateQuery(query.id, query.team_id, true)} className="btn btn-outline-success btn-lg px-3 m-2">Accept</button>
              <button onClick={() => handleUpdateQuery(query.id, query.team_id, false)} className="btn btn-outline-danger btn-lg px-3 m-2">Deny</button>
            </div>
          </div>
        ))}


    </div>
    </div>
  )
};

export default TeamQueries;
