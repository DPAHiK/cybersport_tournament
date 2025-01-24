import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTournaments} from '../../redux/actions/tournamentActions.js';
import { createQuery } from '../../redux/actions/queryActions.js';
import Error from '../Error.js'
import { Link, useParams } from 'react-router-dom';

const TeamApplyQuery = () => {

  const params = useParams()  
  const dispatch = useDispatch();
  const tournaments = useSelector(state => state.tournament.tournaments);
  const error = useSelector(state => state.error.body);
  
  useEffect(() => {
    dispatch(fetchTournaments());
  }, [dispatch]);

  const checkboxes = tournaments.map(tournament => (
    <div key={tournament.id} className='row align-items-center '>
        <div className='col ' style={{fontSize: '1.25em'}}>
          <input type="checkbox" id={tournament.id} className="checkbox me-3"/>
          <label htmlFor={tournament.id} className="">{tournament.title}</label>
        </div>

        <div className='col text-end'>
          <Link to={"/tournament/" + tournament.id} className='mx-2'>
            <button className="btn btn-outline-dark btn-lg px-4 m-2">
              Info
            </button>
          </Link>
        </div>
    </div>
  ))


  const handleSubmit = () => {
    tournaments.forEach((item) => {
        const checkbox = document.getElementById(item.id)
        if(checkbox.checked) dispatch(createQuery({team_id: params.id, tournament_id: item.id, sending_date: Date()}))                          
     })
  }

  return (
    <div>
      <Error body={error}/>

        <div className='container mt-2'>

        <h2 className='m-2'>Check tournaments</h2>
        {checkboxes}
        <Link to={`/team/${params.id}`} onClick={() => {handleSubmit()}}>
          <button className="btn btn-outline-dark btn-lg px-4 m-2">
            Apply
          </button>
        </Link>
        </div>
    </div>
  )
};

export default TeamApplyQuery;
