import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Error = (props) => {
  //console.log(props)
  const navigate = useNavigate()

    // useEffect(() => {
    //   if(props.body && props.body.status == 401) navigate('/login');
    // }, [props.body, navigate]);

  if(props.body)
  return (
    <div className="alert alert-danger" role="alert">
      {props.body.data.error}
    </div>
  );
};

export default Error;
