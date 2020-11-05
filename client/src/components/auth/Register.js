import React, { Fragment, useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
   root: {
      '& .MuiTextField-root': {
         margin: theme.spacing(1),
      },
   },
}));

const Register = () => {
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
         console.log('Passwords do not match');
      } else {
         console.log('Success!');
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
                  required
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
            <div>
               <TextField
                  fullWidth
                  required
                  label="Confirm Password"
                  type="password"
                  variant="outlined"
                  name="password2"
                  minLength="6"
                  value={password2}
                  onChange={(e) => onTextChange(e)}
               />
            </div>
            <Button type="submit" color="primary" variant="contained">
               Sign Up
            </Button>
         </form>
      </Fragment>
   );
};

export default Register;
