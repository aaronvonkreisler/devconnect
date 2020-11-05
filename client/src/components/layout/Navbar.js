import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
   root: {
      flexGrow: 1,
   },
   menuButton: {
      marginRight: theme.spacing(2),
   },
   title: {
      flexGrow: 1,
   },
}));

const Navbar = () => {
   const classes = useStyles();

   return (
      <div className={classes.root}>
         <AppBar position="static">
            <Toolbar>
               <Typography edge="start" variant="h6" className={classes.title}>
                  Dev Connect
               </Typography>
               <Button color="inherit" href="#">
                  Developers
               </Button>
               <Button color="inherit" href="#">
                  Register
               </Button>
               <Button color="inherit" href="#">
                  Login
               </Button>
            </Toolbar>
         </AppBar>
      </div>
   );
};

export default Navbar;
