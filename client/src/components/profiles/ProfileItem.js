import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Card, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const useStyles = makeStyles((theme) => ({
   image: {
      borderRadius: '50%',
      maxWidth: 100,
      margin: theme.spacing(2),
   },
   card: {
      backgroundColor: '#EFEFEF',
      marginTop: theme.spacing(2),
   },
   list: {
      listStyleType: 'none',
   },
   icon: {
      color: 'green',
      paddingTop: theme.spacing(1),
   },
   details: {
      '& .MuiButtonBase-root': {
         marginTop: theme.spacing(1),
      },
      margin: theme.spacing(2),
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
      <Card className={classes.card}>
         <Grid container spacing={2} justify="flex-start" alignItems="center">
            <Grid item xs={12} sm={2}>
               <img src={avatar} alt="" className={classes.image} />
            </Grid>
            <Grid item xs={12} sm={5}>
               <div className={classes.details}>
                  <Typography variant="h6">{name}</Typography>
                  <Typography variant="body2">
                     {status}
                     {company && <span> at {company}</span>}
                  </Typography>
                  <Typography variant="body2">
                     {location && <span>{location}</span>}
                  </Typography>
                  <Button
                     variant="outlined"
                     color="primary"
                     component={RouterLink}
                     to={`/profile/${_id}`}
                  >
                     View Profile
                  </Button>
               </div>
            </Grid>
            <Grid item xs={12} sm={5}>
               <ul className={classes.list}>
                  {skills.slice(0, 4).map((skill, index) => (
                     <li key={index}>
                        <CheckBoxIcon className={classes.icon} />
                        <Typography
                           color="primary"
                           display="inline"
                           variant="body1"
                           align="justify"
                        >
                           {skill}
                        </Typography>
                     </li>
                  ))}
               </ul>
            </Grid>
         </Grid>
      </Card>
   );
};

ProfileItem.propTypes = {
   profile: PropTypes.object.isRequired,
};

export default ProfileItem;
