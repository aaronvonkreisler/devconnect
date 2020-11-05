import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { TextField, Button } from '@material-ui/core';
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
}));

const Register = ({ setAlert, register }) => {
   const classes = useStyles();
   const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      password2: '',
   });

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

   return (
      <Fragment>
         <h1 className="large text-primary">Sign Up</h1>
         <p className="lead">
            <AccountCircleIcon /> Create Your Account
         </p>
         <form className={classes.root} onSubmit={(e) => onFormSubmit(e)}>
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
            <Button type="submit" color="primary" variant="contained">
               Sign Up
            </Button>
         </form>
         <p>
            Already have an account? <Link to="/login">Sign In</Link>
         </p>
      </Fragment>
   );
};

Register.propTypes = {
   setAlert: PropTypes.func.isRequired,
   register: PropTypes.func.isRequired,
};

export default connect(null, { setAlert, register })(Register);
