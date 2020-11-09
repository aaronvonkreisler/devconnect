import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import WorkIcon from '@material-ui/icons/Work';
import SchoolIcon from '@material-ui/icons/School';
const useStyles = makeStyles((theme) => ({
   button: {
      margin: theme.spacing(1),
   },
}));
const DashboardActions = () => {
   const classes = useStyles();
   return (
      <div>
         <Button
            component={RouterLink}
            to="/edit-profile"
            startIcon={<AccountCircleIcon />}
            variant="contained"
            color="default"
            className={classes.button}
         >
            Edit Profile
         </Button>
         <Button
            component={RouterLink}
            to="/add-experience"
            startIcon={<WorkIcon />}
            variant="contained"
            color="default"
            className={classes.button}
         >
            Add Experience
         </Button>
         <Button
            component={RouterLink}
            to="/add-education"
            startIcon={<SchoolIcon />}
            variant="contained"
            color="default"
            className={classes.button}
         >
            Add Education
         </Button>
      </div>
   );
};

export default DashboardActions;