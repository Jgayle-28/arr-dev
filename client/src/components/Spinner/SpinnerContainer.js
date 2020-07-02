import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const SpinnerContainer = () => {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          with: '100%',
          height: '100vh',
        }}>
        <CircularProgress style={{ height: 60, width: 60 }} />
      </div>
    </div>
  );
};

export default SpinnerContainer;
