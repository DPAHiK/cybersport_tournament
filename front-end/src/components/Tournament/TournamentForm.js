import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTournament } from '../../redux/actions/tournamentActions.js';
import { useNavigate } from 'react-router-dom';
import Error from '../Error.js'

const TournamentForm = () => {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const dispatch = useDispatch();
  const errorBody = useSelector(state => state.error.body);
  let response
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    response = await dispatch(createTournament({ title: title, start_date: startDate, end_date: endDate }));
    //console.log(response)
    setTitle('');
    setStartDate('');
    setEndDate('');

    if (!response.error) { 
      navigate('/'); 
    }
  };

  return (
    <div className="container py-5 h-100">
      <Error body={errorBody}/>

      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div className="card bg-dark text-white" style={{borderRadius: 1}}>
            <div className="card-body p-5 text-center">

              <div className="mb-md-5 mt-md-4 pb-5">

                <h2 className="fw-bold mb-2 text-uppercase">Tournament creation</h2>
                <form onSubmit={handleSubmit}>
                  <div data-mdb-input-init className="form-outline form-white mb-4">
                    <label className="form-label" htmlFor="title">Title</label>
                    <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Name your tournament"
                    className='form-control form-control-lg'
                    required
                    />
                  </div>

                  <div data-mdb-input-init className="form-outline form-white mb-4">
                    <label className="form-label" htmlFor="title">Start date</label>
                    <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setStartDate(e.target.value)}
                    placeholder="Set start date"
                    className='form-control form-control-lg'
                    required
                    />
                  </div>

                  <div data-mdb-input-init className="form-outline form-white mb-4">
                    <label className="form-label" htmlFor="title">End date</label>
                    <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setEndDate(e.target.value)}
                    placeholder="Set end date"
                    className='form-control form-control-lg'
                    required
                    />
                  </div>

                  <button className="btn btn-outline-light btn-lg px-5" type="submit">Create a tournament</button>

                </form>
              </div>

            </div>
          </div>
        </div>
      </div>

    </div>

  );
};

export default TournamentForm;
