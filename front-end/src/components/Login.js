import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions/authActions.js';
import { useNavigate } from 'react-router-dom';
import Error from './Error.js'

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  let error
  const errorBody = useSelector(state => state.error.body);
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = { name, password };
  
    error = await dispatch(login(loginData)); 
    //console.log(error); 
  
    setName('');
    setPassword('');
  
    if (!error) { 
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

              <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
              <form onSubmit={handleSubmit}>
                <div data-mdb-input-init className="form-outline form-white mb-4">
                  <label className="form-label" for="typeEmailX">Name</label>
                  <input
                  id="typeEmailX"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  className='form-control form-control-lg'
                  required
                  />
                </div>

                <div data-mdb-input-init className="form-outline form-white mb-4">
                 <label className="form-label" for="typePasswordX">Password</label>
                  <input
                  id="typePasswordX"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className='form-control form-control-lg'
                  required
                  />
                </div>


                <button data-mdb-button-init data-mdb-ripple-init className="btn btn-outline-light btn-lg px-5" type="submit">Login</button>

              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
  )

};

export default Login;
