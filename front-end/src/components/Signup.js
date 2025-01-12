import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions.js';
import { useNavigate } from 'react-router-dom';
import Error from './Error.js'

const Signup = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  let error
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
    <div>
      <Error body={error}/>

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
      <button type="submit">Login</button>
    </form>
    </div>
  )

};

export default Signup;
