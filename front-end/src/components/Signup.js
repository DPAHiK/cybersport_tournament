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
    <div className='container'>
      <Error body={errorBody}/>

      <form onSubmit={handleSubmit} >
    <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className='form-control'
        required
      />
    <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className='form-control'
        required
      />

    <input
        type="text"
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
        placeholder="Confirm password"
        className='form-control'
        required
      />
      <button type="submit" className='btn btn-success'>Signup</button>
    </form>
    </div>
  )

};

export default Signup;
