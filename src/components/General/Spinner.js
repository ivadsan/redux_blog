import React from 'react';
import '../../assets/css/components/spinner.css';

function Spinner() {
  return (
    <div className='center'>
      <div className='lds-ellipsis'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Spinner;
