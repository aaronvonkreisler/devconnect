import React, { useState } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
   Button,
   Card,
   Checkbox,
   Container,
   FormControlLabel,
   TextField,
   Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { addExperience } from '../../actions/profile';

const useStyles = makeStyles((theme) => ({
   root: {
      '& .MuiTextField-root': {
         marginTop: theme.spacing(2),
      },
      '& .MuiButtonBase-root': {
         margin: theme.spacing(2),
      },
   },
   title: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
   },
   formControl: {
      marginTop: theme.spacing(2),
   },
}));

const AddExperience = ({ addExperience, history }) => {
   const classes = useStyles();
   const [formData, setFormData] = useState({
      company: '',
      title: '',
      location: '',
      from: '',
      to: '',
      current: false,
      description: '',
   });
   const [toDateDisabled, toggleDisabled] = useState(false);
   const {
      company,
      title,
      location,
      from,
      to,
      current,
      description,
   } = formData;

   const onChange = (e) =>
      setFormData({ ...formData, [e.target.name]: e.target.value });

   const onFormSubmit = (e) => {
      e.preventDefault();
      addExperience(formData, history);
   };
   return (
      <Container style={{ marginTop: '2rem' }}>
         <Card>
            <Container>
               <div className={classes.title}>
                  <Typography variant="h4">Add An Experience</Typography>
                  <Typography variant="body1">
                     <i className="fas fa-code-branch"></i> Add any
                     developer/programming positions that you have had in the
                     past
                  </Typography>
                  <Typography variant="caption">* = required field</Typography>
               </div>
               <form className={classes.root} onSubmit={(e) => onFormSubmit(e)}>
                  <TextField
                     fullWidth
                     variant="outlined"
                     type="text"
                     label="Job Title"
                     name="title"
                     required
                     value={title}
                     onChange={(e) => onChange(e)}
                  />

                  <TextField
                     fullWidth
                     variant="outlined"
                     type="text"
                     label="Company"
                     name="company"
                     required
                     value={company}
                     onChange={(e) => onChange(e)}
                  />

                  <TextField
                     fullWidth
                     variant="outlined"
                     type="text"
                     label="Location"
                     name="location"
                     value={location}
                     onChange={(e) => onChange(e)}
                  />

                  <Typography variant="h6">From Date</Typography>
                  <TextField
                     fullWidth
                     variant="outlined"
                     type="date"
                     name="from"
                     value={from}
                     onChange={(e) => onChange(e)}
                  />

                  <FormControlLabel
                     control={
                        <Checkbox
                           name="current"
                           checked={current}
                           value={current}
                           onChange={(e) => {
                              setFormData({
                                 ...formData,
                                 current: !current,
                              });
                              toggleDisabled(!toDateDisabled);
                           }}
                        />
                     }
                     label="Current Job"
                  />

                  <Typography variant="h6">To Date</Typography>
                  <TextField
                     fullWidth
                     variant="outlined"
                     type="date"
                     name="to"
                     value={to}
                     onChange={(e) => onChange(e)}
                     disabled={toDateDisabled}
                  />

                  <TextField
                     fullWidth
                     name="description"
                     variant="outlined"
                     multiline
                     rows={5}
                     label="Job Description"
                     value={description}
                     onChange={(e) => onChange(e)}
                  />

                  <Button type="submit" variant="contained" color="primary">
                     Add Experience
                  </Button>
                  <Button
                     variant="contained"
                     color="default"
                     component={RouterLink}
                     to="/dashboard"
                  >
                     Go Back
                  </Button>
               </form>
            </Container>
         </Card>
      </Container>
   );
};

AddExperience.propTypes = {
   addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(AddExperience);
