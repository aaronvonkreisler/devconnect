import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import {
   AppBar,
   Toolbar,
   Typography,
   Button,
   IconButton,
   Menu,
   MenuItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
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
   const [anchorEl, setAnchorEl] = useState(null);
   const open = Boolean(anchorEl);

   const handleMenu = (e) => {
      setAnchorEl(e.currentTarget);
   };

   const handleClose = () => {
      setAnchorEl(null);
   };

   const authLinks = (
      <React.Fragment>
         <Button color="inherit" component={RouterLink} to="/dashboard">
            Dashboard
         </Button>
         <Button color="inherit" onClick={logout}>
            Logout
         </Button>
         <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
         >
            <AccountCircle />
         </IconButton>
         <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
               vertical: 'top',
               horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
               vertical: 'top',
               horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
         >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
         </Menu>
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
