import React from 'react';
import { Button } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa'; 

const FAB = ({ onClick }) => {
  return (
    <Button
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        borderRadius: '50%',
        width: '56px',
        height: '56px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        backgroundColor: '#6f42c1', 
        border: 'none',
      }}
      onClick={onClick}
    >
      <FaPlus style={{ color: 'white' }} />
    </Button>
  );
};

export default FAB;
