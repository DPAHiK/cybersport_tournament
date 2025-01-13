import React from 'react';
import { useNavigate } from 'react-router-dom';

const Error = (props) => {
  //console.log(props)
  const navigate = useNavigate()
  if(props.body)
    if(props.body.status == 401) navigate('/login'); 
    else return (
    <div className="alert alert-danger" role="alert">
      {props.body.data.error}
    </div>
  );
};

export default Error;
