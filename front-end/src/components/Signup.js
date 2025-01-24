import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setError, signup } from '../redux/actions/authActions.js';
import { useNavigate } from 'react-router-dom';
import Error from './Error.js'

const Signup = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const dispatch = useDispatch();
  let error
  const errorBody = useSelector(state => state.error.body);
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(password != passwordConfirm) {
        dispatch(setError({data: {error: "Passwords are not same"}})); 
        return
    }

    const signupData = { name, password };
  
    error = await dispatch(signup(signupData)); 
    //console.log(error); 
  
    setName('');
    setPassword('');
    setPasswordConfirm('');

    if (!error) { 
      navigate('/login'); 
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

              <h2 className="fw-bold mb-2 text-uppercase">Registration</h2>
              <form onSubmit={handleSubmit}>
                <div data-mdb-input-init className="form-outline form-white mb-4">
                  <label className="form-label" htmlFor="typeEmailX">Name</label>
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
                 <label className="form-label" htmlFor="typePasswordX">Password</label>
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

                <div data-mdb-input-init className="form-outline form-white mb-4">
                 <label className="form-label" htmlFor="typeConfirmPasswordX">Confirm password</label>
                  <input
                  id="typeConfirmPasswordX"
                  type="password"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  placeholder="Confirm password"
                  className='form-control form-control-lg'
                  required
                  />
                </div>

                <button className="btn btn-outline-light btn-lg px-5" type="submit">Signup</button>

              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
  )

};

export default Signup;
