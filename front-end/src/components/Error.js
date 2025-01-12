import React from 'react';

const Error = (props) => {

  if(props.body)
    return (
    <div>
      {props.body.data.error}
    </div>
  );
};

export default Error;
