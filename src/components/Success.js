import React from 'react';

const Success = ({ message }) => {
  return (
    <div
      style={{
        backgroundColor: '#C0C0C0',
        padding: '1px',
        border: '1px solid green',
        color: 'green',
        fontSize: '20px',
        fontWeight: 'bold',
        textAlign: 'center',
        borderRadius: '5px',
      }}
      className="success"
    >
      <p>{message}</p>
    </div>
  );
};

export default Success;
