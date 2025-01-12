import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../redux/actions.js';
import { useNavigate } from 'react-router-dom';
import Error from './Error.js'

const Signup = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const dispatch = useDispatch();
  let error
  const errorBody = useSelector(state => state.error);
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(password != passwordConfirm) return

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
    <div>
      <Error body={errorBody}/>

      <form onSubmit={handleSubmit}>
    <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
    <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />

    <input
        type="text"
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
        placeholder="Confirm password"
        required
      />
      <button type="submit">Signup</button>
    </form>
    </div>
  )

};

export default Signup;
