import React from 'react';

const Failure = ({ message }) => {
  return (
    <div
      style={{
        backgroundColor: '#C0C0C0',
        padding: '1px',
        border: '1px solid red',
        color: 'red',
        fontSize: '20px',
        textAlign: 'center',
        fontWeight: 'bold',
        borderRadius: '5px',
      }}
      className="error"
    >
      <p>{message}</p>
    </div>
  );
};

export default Failure;
