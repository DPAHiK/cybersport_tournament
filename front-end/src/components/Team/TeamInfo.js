import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeMember, fetchTeamById, fetchTeamMembers } from '../../redux/actions/teamActions.js';
import { createQueryMember } from '../../redux/actions/queryActions.js';
import Error from '../Error.js'
import { Link, useParams } from 'react-router-dom';
import { checkRole } from '../check.js';

const TeamInfo = () => {



  const params = useParams()

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTeamById(params.id));
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchTeamMembers(params.id));
  }, [dispatch]);

  const team = useSelector(state => state.team.teamUnique)
  const teamMembers = useSelector(state => state.team.teamMembers)
  const error = useSelector(state => state.error.body);
  const user = sessionStorage.getItem('user')


 const handleApply = (id) => {
  dispatch(createQueryMember({team_id: id, sending_date: Date()}));
};

const handleDelete = (id) => {
  dispatch(removeMember(id, team.id));
};

  if(team) return (
    <div>
      <Error body={error}/>

      <div className='container mt-2'>
        <h2 className='text-dark m-2'>{team.name}</h2>

        {(team && team.creator_id == user || checkRole()) &&
          <Link to={`/team/${params.id}/apply`} className='mx-2'>
            <button className="btn btn-outline-dark btn-lg px-3 m-2">
              Apply a query
            </button>
          </Link>}

        
        {teamMembers && !teamMembers.find(item => item.user_id == user) && checkRole('ROLE_PLAYER') &&
          <button onClick={() => handleApply(team.id)} className="btn btn-outline-dark btn-lg px-3 m-2">
            Query for join
          </button> }


          {teamMembers && teamMembers.map(member => (
            <div key={member.id} className='row align-items-center '>
              <div className='col mt-2' style={{fontSize: '1.25em'}}>
                {member.name}
              </div>

            {(user == team.creator_id || checkRole()) &&
            <div className='col text-end'>
              <button onClick={() => handleDelete(member.id)} className="btn btn-outline-danger btn-lg px-3 m-2">Delete</button>
            </div>}
              

            </div>
          ))}
    

      </div>
    </div>
  )
};

export default TeamInfo;
