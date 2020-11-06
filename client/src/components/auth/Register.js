import React, { Fragment, useState, useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
   TextField,
   Button,
   Grid,
   Paper,
   Container,
   Typography,
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';

import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

const useStyles = makeStyles((theme) => ({
   root: {
      '& .MuiTextField-root': {
         marginTop: theme.spacing(2),
      },
      '& .MuiButtonBase-root': {
         marginTop: theme.spacing(2),
      },
   },
   title: {
      marginTop: theme.spacing(2),
   },
}));

const Register = ({ setAlert, register, isAuthenticated }) => {
   const classes = useStyles();
   const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      password2: '',
   });

   useLayoutEffect(() => {
      document.body.style.background =
         'linear-gradient(90deg, pink 50%, #F0F0F0 50%)';

      return () => {
         document.body.style.background = 'white';
      };
   }, []);

   const { name, email, password, password2 } = formData;

   const onTextChange = (e) =>
      setFormData({ ...formData, [e.target.name]: e.target.value });

   const onFormSubmit = async (e) => {
      e.preventDefault();
      if (password !== password2) {
         setAlert('Passwords do not match', 'toast', 'error');
      } else {
         register({ name, email, password });
      }
   };

   if (isAuthenticated) {
      return <Redirect to="/dashboard" />;
   }

   return (
      <Fragment>
         <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
         >
            <Grid item xs={6}>
               Left side Container
            </Grid>
            <Grid item xs={6}>
               <Paper>
                  <Container>
                     <Typography variant="h4" className={classes.title}>
                        Sign Up
                     </Typography>
                     <Typography>
                        <AccountCircleIcon /> Create Your Account
                     </Typography>

                     <form
                        className={classes.root}
                        onSubmit={(e) => onFormSubmit(e)}
                     >
                        <div>
                           <TextField
                              fullWidth
                              label="Name"
                              type="text"
                              variant="outlined"
                              name="name"
                              value={name}
                              onChange={(e) => onTextChange(e)}
                           />
                        </div>
                        <div>
                           <TextField
                              fullWidth
                              label="Email Address"
                              type="email"
                              variant="outlined"
                              name="email"
                              value={email}
                              onChange={(e) => onTextChange(e)}
                           />
                        </div>
                        <div>
                           <TextField
                              fullWidth
                              label="Password"
                              type="password"
                              variant="outlined"
                              name="password"
                              value={password}
                              onChange={(e) => onTextChange(e)}
                           />
                        </div>
                        <div>
                           <TextField
                              fullWidth
                              label="Confirm Password"
                              type="password"
                              variant="outlined"
                              name="password2"
                              value={password2}
                              onChange={(e) => onTextChange(e)}
                           />
                        </div>
                        <Button
                           type="submit"
                           color="primary"
                           variant="contained"
                        >
                           Sign Up
                        </Button>
                     </form>
                     <Typography variant="subtitle1" display="block">
                        Already have an account?{' '}
                        <Link to="/login">Sign In</Link>
                     </Typography>
                  </Container>
               </Paper>
            </Grid>
         </Grid>
      </Fragment>
   );
};

Register.propTypes = {
   setAlert: PropTypes.func.isRequired,
   register: PropTypes.func.isRequired,
   isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
   isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
