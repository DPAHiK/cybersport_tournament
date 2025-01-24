import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTeam } from '../../redux/actions/teamActions.js';
import { useNavigate } from 'react-router-dom';
import Error from '../Error.js'

const TeamForm = () => {
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const errorBody = useSelector(state => state.error.body);
  let response
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    response = await dispatch(createTeam({ name }));
    //console.log(response)
    setName('');

    if (!response.error) { 
      navigate('/team/' + response.id); 
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

                <h2 className="fw-bold mb-2 text-uppercase">Team creation</h2>
                <form onSubmit={handleSubmit}>
                  <div data-mdb-input-init className="form-outline form-white mb-4">
                    <label className="form-label" htmlFor="teamName">Name</label>
                    <input
                    id="teamName"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name your team"
                    className='form-control form-control-lg'
                    required
                    />
                  </div>

                  <button className="btn btn-outline-light btn-lg px-5" type="submit">Create a team</button>

                </form>
              </div>

            </div>
          </div>
        </div>
      </div>
    
    </div>

  );
};

export default TeamForm;
