import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';
import { login } from '../../actions/auth';

const useStyles = makeStyles((theme) => ({
   root: {
      '& .MuiTextField-root': {
         marginTop: theme.spacing(2),
      },
      '& .MuiButtonBase-root': {
         marginTop: theme.spacing(2),
      },
   },
}));

const Login = ({ login, isAuthenticated }) => {
   const classes = useStyles();
   const [formData, setFormData] = useState({
      email: '',
      password: '',
   });

   const { email, password } = formData;

   const onTextChange = (e) =>
      setFormData({ ...formData, [e.target.name]: e.target.value });

   const onFormSubmit = async (e) => {
      e.preventDefault();
      login(email, password);
   };

   // Redirect if log in successful
   if (isAuthenticated) {
      return <Redirect to="/dashboard" />;
   }

   return (
      <Fragment>
         <h1 className="large text-primary">Sign In</h1>
         <p className="lead">
            <AccountCircleIcon /> Sign In To Your Account
         </p>
         <form className={classes.root} onSubmit={(e) => onFormSubmit(e)}>
            <div>
               <TextField
                  fullWidth
                  required
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
                  required
                  label="Password"
                  type="password"
                  variant="outlined"
                  name="password"
                  minLength="6"
                  value={password}
                  onChange={(e) => onTextChange(e)}
               />
            </div>
            <Button type="submit" color="primary" variant="contained">
               Sign In
            </Button>
         </form>
         <p>
            Don't have an account? <Link to="/register">Sign Up!</Link>
         </p>
      </Fragment>
   );
};

Login.propTypes = {
   login: PropTypes.func.isRequired,
   isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
   isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
