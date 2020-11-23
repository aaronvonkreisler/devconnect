import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
   TextField,
   Button,
   Grid,
   Card,
   Typography,
   CssBaseline,
} from '@material-ui/core';
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
      <React.Fragment>
         <CssBaseline />
         <div className="signup flex flex-center w-100 h-100vh">
            <div className="p-8">
               <Card className="signup-card position-relative y-center">
                  <Grid container>
                     <Grid item lg={5} md={5} sm={5} xs={12}>
                        <div className="p-32 flex flex-center flex middle h-100">
                           <img
                              src="assets/illustrations/standing-4.svg"
                              alt=""
                           />
                        </div>
                     </Grid>
                     <Grid item lg={7} md={7} sm={7} xs={12}>
                        <div className="p-36 h-100 bg-light-gray position-relative">
                           <Typography variant="h5">Sign Up Today</Typography>
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
                        </div>
                     </Grid>
                  </Grid>
               </Card>
            </div>
         </div>
      </React.Fragment>
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
