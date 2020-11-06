import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { TextField, Button, Grid, Card, Typography } from '@material-ui/core';
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
      <div className="signup flex flex-center w-100 h-100vh">
         <div className="p-8">
            <Card className="signup-card position-relative y-center">
               <Grid container>
                  <Grid item lg={5} md={5} sm={5} xs={12}>
                     <div className="p-32 flex flex-center flex-middle h-100">
                        <img
                           src="/assets/illustrations/standing-22.svg"
                           alt=""
                        />
                     </div>
                  </Grid>
                  <Grid item lg={7} md={7} sm={7} xs={12}>
                     <div className="p-36 h-100 bg-light-gray position relative">
                        <Typography variant="h5">Welcome back!</Typography>
                        <form
                           className={classes.root}
                           onSubmit={(e) => onFormSubmit(e)}
                        >
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
                           <Button
                              type="submit"
                              color="primary"
                              variant="contained"
                           >
                              Sign In
                           </Button>
                        </form>
                        <Typography variant="subtitle1">
                           Don't have an account?{' '}
                           <Link to="/register">Sign Up!</Link>
                        </Typography>
                     </div>
                  </Grid>
               </Grid>
            </Card>
         </div>
      </div>
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
