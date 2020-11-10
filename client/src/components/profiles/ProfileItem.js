import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Card, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
   image: {
      borderRadius: '50%',
      minWidth: 120,
   },
}));

const ProfileItem = ({
   profile: {
      user: { _id, name, avatar },
      status,
      company,
      location,
      skills,
   },
}) => {
   const classes = useStyles();
   return (
      <div className="flex">
         <div className="p-8">
            <Card className="bg-light-gray">
               <Grid container spacing={2} justify="center">
                  <Grid item xs={4}>
                     <div className="p-32 flex flex-center">
                        <img src={avatar} alt="" className={classes.image} />
                     </div>
                  </Grid>
                  <Grid item direction="column" xs={6}>
                     <Typography variant="h6">{name}</Typography>
                     <Typography variant="body2">{status}</Typography>
                     <Typography variant="body2">{location}</Typography>
                  </Grid>
                  <Grid item xs={2}>
                     Skills
                  </Grid>
               </Grid>
            </Card>
         </div>
      </div>
   );
};

ProfileItem.propTypes = {
   profile: PropTypes.object.isRequired,
};

export default ProfileItem;
