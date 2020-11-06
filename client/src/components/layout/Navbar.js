import React from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const useStyles = makeStyles((theme) => ({
   root: {
      flexGrow: 1,
      color: 'white',
   },
   menuButton: {
      marginRight: theme.spacing(2),
   },
   title: {
      flexGrow: 1,
      textDecoration: 'none',
      color: 'white',
   },
}));

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
   const classes = useStyles();

   const authLinks = (
      <React.Fragment>
         <Button color="inherit" onClick={logout}>
            Logout
         </Button>
      </React.Fragment>
   );

   const guestLinks = (
      <React.Fragment>
         <Button color="inherit" href="#!">
            Developers
         </Button>
         <Button color="inherit" component={RouterLink} to="/register">
            Register
         </Button>

         <Button
            color="secondary"
            variant="contained"
            component={RouterLink}
            to="/login"
         >
            Login
         </Button>
      </React.Fragment>
   );

   return (
      <div className={classes.root}>
         <AppBar position="static">
            <Toolbar>
               <Typography
                  edge="start"
                  variant="h6"
                  color="inherit"
                  className={classes.title}
                  component={RouterLink}
                  to="/"
               >
                  Dev Connect
               </Typography>
               {!loading && (
                  <React.Fragment>
                     {isAuthenticated ? authLinks : guestLinks}
                  </React.Fragment>
               )}
            </Toolbar>
         </AppBar>
      </div>
   );
};

Navbar.propTypes = {
   logout: PropTypes.func.isRequired,
   auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
   auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
