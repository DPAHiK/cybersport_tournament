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
    <div key={tournament.id}>
        <input type="checkbox" id={tournament.id}/>
        {tournament.title}
        <Link to={"/tournament/" + tournament.id} className='mx-2'>Info</Link>
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

        <div>

        <h2>Check tournaments</h2>
        {checkboxes}
        <button onClick={() => {handleSubmit()}}>Apply</button>

        </div>
    </div>
  )
};

export default TeamApplyQuery;
