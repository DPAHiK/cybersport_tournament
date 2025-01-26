import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTournament } from '../../redux/actions/tournamentActions.js';
import { useNavigate } from 'react-router-dom';
import Error from '../Error.js'

const TournamentForm = () => {
  const [title, setTitle] = useState('');

  const [startDateDay, setStartDateDay] = useState('');
  const [startDateMonth, setStartDateMonth] = useState('');
  const [startDateYear, setStartDateYear] = useState('');

  const [endDateDay, setEndDateDay] = useState('');
  const [endDateMonth, setEndDateMonth] = useState('');
  const [endDateYear, setEndDateYear] = useState('');

  const dispatch = useDispatch();
  const errorBody = useSelector(state => state.error.body);
  let response
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    let startDate = new Date()
    startDate.setDate(startDateDay)
    startDate.setMonth(startDateMonth - 1)
    startDate.setFullYear(startDateYear)

    let endDate = new Date()
    endDate.setDate(endDateDay)
    endDate.setMonth(endDateMonth - 1)
    endDate.setFullYear(endDateYear)

    response = await dispatch(createTournament({ title: title, start_date: startDate, end_date: endDate, is_began: false }));
    //console.log(response)
    setTitle('');
    
    setStartDateDay('');
    setStartDateMonth('');
    setStartDateYear('');
    
    setEndDateDay('');
    setEndDateMonth('');
    setEndDateYear('');

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

                  <label className="form-label" htmlFor="startDay">Start Date</label>
                  <div data-mdb-input-init className="form-outline form-white mb-4 row">
                    <div className="col">
                      <label className="form-label" htmlFor="startDay">Day</label>
                      <input
                      id="startDay"
                      type="text"
                      value={startDateDay}
                      onChange={(e) => setStartDateDay(e.target.value)}
                      placeholder="Day"
                      className='form-control form-control-lg'
                      required
                      />
                    </div>

                    <div className="col" >
                      <label className="form-label" htmlFor="startMonth">Month</label>
                      <input
                      id="startMonth"
                      type="text"
                      value={startDateMonth}
                      onChange={(e) => setStartDateMonth(e.target.value)}
                      placeholder="Month"
                      className='form-control form-control-lg'
                      required
                      />
                    </div>

                    <div className="col" >
                      <label className="form-label" htmlFor="startYear">Year</label>
                      <input
                      id="startYear"
                      type="text"
                      value={startDateYear}
                      onChange={(e) => setStartDateYear(e.target.value)}
                      placeholder="Year"
                      className='form-control form-control-lg'
                      required
                      />
                    </div>
                  </div>

                  <label className="form-label" htmlFor="endDay">End date</label>
                  <div data-mdb-input-init className="form-outline form-white mb-4 row">
                    <div className='col'>
                      <label className="form-label" htmlFor="endDay">Day</label>
                      <input
                      id="endDay"
                      type="text"
                      value={endDateDay}
                      onChange={(e) => setEndDateDay(e.target.value)}
                      placeholder="Day"
                      className='form-control form-control-lg'
                      required
                      />
                    </div>

                    <div className='col'>
                      <label className="form-label" htmlFor="endMonth">Month</label>
                      <input
                      id="endMonth"
                      type="text"
                      value={endDateMonth}
                      onChange={(e) => setEndDateMonth(e.target.value)}
                      placeholder="Month"
                      className='form-control form-control-lg'
                      required
                      />
                    </div>

                    <div className='col'>
                      <label className="form-label" htmlFor="endYear">Year</label>
                      <input
                      id="endYear"
                      type="text"
                      value={endDateYear}
                      onChange={(e) => setEndDateYear(e.target.value)}
                      placeholder="Year"
                      className='form-control form-control-lg'
                      required
                      />
                    </div>
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
