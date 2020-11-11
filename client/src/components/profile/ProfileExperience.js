import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
   root: {
      borderBottom: '#ccc 1px dotted',
      marginBottom: '1rem',
      paddingBottom: '1rem',
      marginLeft: '0.5rem',
   },
   text: {
      marginBottom: '0.5rem',
   },
});

const ProfileExperience = ({
   experience: { company, title, location, current, to, from, description },
}) => {
   const classes = useStyles();
   return (
      <div className={classes.root}>
         <Typography variant="h6" className={classes.text}>
            {company}
         </Typography>
         <Typography variant="subtitle1">
            <Moment format="MM/DD/YYYY">{from}</Moment> -{' '}
            {!to ? 'Current' : <Moment format="MM/DD/YYYY">{to}</Moment>}
         </Typography>
         <Typography variant="body1" paragraph>
            <strong>Position: </strong>
            {title}
         </Typography>
         <Typography variant="body1" paragraph>
            <strong>Description: </strong>
            {description}
         </Typography>
      </div>
   );
};

ProfileExperience.propTypes = {
   experience: PropTypes.array.isRequired,
};

export default ProfileExperience;
