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

      <div className='container mt-2'>
      <h2 className='m-2'>Tournaments</h2>
      {checkRole('ROLE_ORGINIZER') &&
          <Link to='/tournament/create' >
            <button className="btn btn-outline-dark btn-lg px-3 m-2">
              Create a tournament
            </button>
          </Link>}

          {tournaments.map(tournament => (
            <div key={tournament.id} className='row align-items-center '>
              <div className='col ' style={{fontSize: '1.25em'}}>{tournament.title}</div>
              
              <div className='col text-end'>
              {(user == tournament.organizer_id || checkRole()) && 
                <Link to={"/tournament/" + tournament.id + "/query"}  className='mx-2'>
                  <button className="btn btn-outline-dark btn-lg px-3 m-2">
                    Queries
                  </button>
                </Link>
              }

                <Link to={"/tournament/" + tournament.id}>              
                  <button className="btn btn-outline-dark btn-lg px-4 m-2">
                    Info
                  </button>
                </Link>

              {(user == tournament.organizer_id || checkRole()) &&
                  <button onClick={() => handleDelete(tournament.id)} className="btn btn-outline-danger btn-lg px-3 m-2">Delete</button>
              }
              </div>
            </div>
          ))}
    </div>
    </div>
  )
};

export default TournamentList;
