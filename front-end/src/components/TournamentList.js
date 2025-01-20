import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTournaments, removeTournament } from '../redux/actions/tournamentActions.js';
import Error from './Error.js'
import { Link } from 'react-router-dom';

const TournamentList = () => {
  const dispatch = useDispatch();
  const tournaments = useSelector(state => state.tournament.tournaments);
  const error = useSelector(state => state.error.body);

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
      <Link to='/tournament/create' >Create a tournament</Link>
      <ul>
        {tournaments.map(tournament => (
          <li key={tournament.id}>
            {tournament.title}
            <Link to={"/tournament/" + tournament.id + "/query"}>Queries</Link>
            <Link to={"/tournament/" + tournament.id}>Info</Link>
            <button onClick={() => handleDelete(tournament.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
    </div>
  )
};

export default TournamentList;
