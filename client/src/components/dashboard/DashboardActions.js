import React from 'react';

import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import WorkIcon from '@material-ui/icons/Work';
import SchoolIcon from '@material-ui/icons/School';
const useStyles = makeStyles((theme) => ({
   button: {
      margin: theme.spacing(1),
      verticalAlign: 'bottom',
   },
}));
const DashboardActions = ({
   setOnEditOpen,
   setOnExperienceOpen,
   setOnEducationOpen,
}) => {
   const classes = useStyles();
   return (
      <div>
         <Button
            onClick={() => setOnEditOpen(true)}
            startIcon={<AccountCircleIcon />}
            variant="outlined"
            color="primary"
            className={classes.button}
         >
            Edit Profile
         </Button>
         <Button
            onClick={() => setOnExperienceOpen(true)}
            startIcon={<WorkIcon />}
            variant="outlined"
            color="primary"
            className={classes.button}
         >
            Add Experience
         </Button>
         <Button
            onClick={() => setOnEducationOpen(true)}
            startIcon={<SchoolIcon />}
            variant="outlined"
            color="primary"
            className={classes.button}
         >
            Add Education
         </Button>
      </div>
   );
};

export default DashboardActions;
