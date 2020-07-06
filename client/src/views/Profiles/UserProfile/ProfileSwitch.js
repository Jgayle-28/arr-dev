import React, { useState } from 'react';
import UserProfileContainer from './UserProfileContainer';
import EditProfile from '../EditProfile';
import Grid from '@material-ui/core/Grid';

const ProfileSwitch = () => {
  const [edit, setEdit] = useState(false);
  const handleEditClick = () => {
    setEdit((edit) => !edit);
  };
  return (
    <div style={{ flexGrow: 1 }}>
      <Grid container spacing={1} justify='center'>
        <Grid item xs={10}>
          {edit ? (
            <EditProfile setEdit={handleEditClick} />
          ) : (
            <UserProfileContainer setEdit={handleEditClick} />
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default ProfileSwitch;
