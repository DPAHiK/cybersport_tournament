import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTournaments, removeTeam } from '../redux/actions.js';
import Error from './Error.js'

const TournamentList = () => {
  const dispatch = useDispatch();
  const tournaments = useSelector(state => state.tournament.tournaments);
  const error = useSelector(state => state.error.body);

  useEffect(() => {
    dispatch(fetchTournaments());
  }, [dispatch]);


  return (
    <div>
      <Error body={error}/>

      <div>
      <h2>Tournaments</h2>
      
      <ul>
        {tournaments.map(tournament => (
          <li key={tournament.id}>
            {tournament.title}
          </li>
        ))}
      </ul>
    </div>
    </div>
  )
};

export default TournamentList;
