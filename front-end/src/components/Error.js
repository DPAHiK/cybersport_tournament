import React from 'react';

const Error = (props) => {
  //console.log(props)
  if(props.body)
    return (
    <div>
      {props.body.data.error}
    </div>
  );
};

export default Error;
