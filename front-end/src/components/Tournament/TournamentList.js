import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTournaments, removeTournament } from '../../redux/actions/tournamentActions.js';
import { createQuery } from '../../redux/actions/queryActions.js';
import Error from '../Error.js'
import { Link } from 'react-router-dom';
import { checkRole } from '../check.js';

const TournamentList = () => {
  const dispatch = useDispatch();
  const tournaments = useSelector(state => state.tournament.tournaments);
  const error = useSelector(state => state.error.body);
  const user = sessionStorage.getItem('user')

  useEffect(() => {
    dispatch(fetchTournaments());
  }, [dispatch]);


  const handleDelete = (id) => {
    dispatch(removeTournament(id));
  };

  return (
    <div>
      <Error body={error}/>

      <div>
      <h2>Tournaments</h2>
      {checkRole('ROLE_ORGINIZER') &&
        <Link to='/tournament/create' >Create a tournament</Link>}
      
      <ul>
        {tournaments.map(tournament => (
          <li key={tournament.id}>
            {tournament.title}
            {(user == tournament.organizer_id || checkRole()) && 
            <Link to={"/tournament/" + tournament.id + "/query"}  className='mx-2'>Queries</Link>}
            <Link to={"/tournament/" + tournament.id} className='mx-2'>Info</Link>
            {(user == tournament.organizer_id || checkRole()) &&
              <button onClick={() => handleDelete(tournament.id)} className='mx-2'>Delete</button>}
          </li>
        ))}
      </ul>
    </div>
    </div>
  )
};

export default TournamentList;
