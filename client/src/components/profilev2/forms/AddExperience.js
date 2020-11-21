import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
   makeStyles,
   Container,
   Dialog,
   DialogTitle,
   DialogContent,
   DialogActions,
   FormControlLabel,
   FormControl,
   Button,
   Checkbox,
   TextField,
} from '@material-ui/core';

import { addExperience } from '../../../actions/profile';

const useStyles = makeStyles((theme) => ({
   formControl: {
      margin: theme.spacing(1),
   },
}));

const AddExperience = ({
   addExperience,
   onExperienceOpen,
   setOnExperienceOpen,
}) => {
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

   const {
      company,
      title,
      location,
      from,
      to,
      current,
      description,
   } = formData;

   const handleClose = () => {
      setOnExperienceOpen(false);
   };

   const onChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const onExperienceSubmit = (e) => {
      e.preventDefault();
      addExperience(formData);
      setFormData({
         company: '',
         title: '',
         location: '',
         from: '',
         to: '',
         current: false,
         description: '',
      });
   };
   return (
      <Dialog open={onExperienceOpen} onClose={handleClose} maxWidth="sm">
         <DialogTitle>Add Experience</DialogTitle>
         <DialogContent dividers>
            <FormControl className={classes.formControl} fullWidth>
               <TextField
                  type="text"
                  label="Job Title"
                  name="title"
                  required
                  value={title}
                  onChange={(e) => onChange(e)}
               />
            </FormControl>
            <FormControl className={classes.formControl} fullWidth>
               <TextField
                  type="text"
                  label="Company"
                  name="company"
                  required
                  value={company}
                  onChange={(e) => onChange(e)}
               />
            </FormControl>
            <FormControl className={classes.formControl} fullWidth>
               <TextField
                  type="text"
                  label="Location"
                  name="location"
                  required
                  value={location}
                  onChange={(e) => onChange(e)}
               />
            </FormControl>
            <FormControl className={classes.formControl} fullWidth>
               <TextField
                  label="From Date"
                  type="date"
                  name="from"
                  value={from}
                  required
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => onChange(e)}
               />
            </FormControl>
            <FormControl className={classes.formControl} fullWidth>
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
                        }}
                     />
                  }
                  label="Current Job"
               />
            </FormControl>
            <FormControl className={classes.formControl} fullWidth>
               <TextField
                  label="To Date"
                  type="date"
                  name="to"
                  value={to}
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => onChange(e)}
                  disabled={current}
               />
            </FormControl>
            <FormControl className={classes.formControl} fullWidth>
               <TextField
                  name="description"
                  variant="outlined"
                  multiline
                  rows={5}
                  label="Job Description"
                  value={description}
                  onChange={(e) => onChange(e)}
               />
            </FormControl>
         </DialogContent>
         <DialogActions>
            <Button onClick={handleClose} color="primary">
               Cancel
            </Button>
            <Button onClick={onExperienceSubmit} color="primary">
               Add
            </Button>
         </DialogActions>
      </Dialog>
   );
};

AddExperience.propTypes = {
   addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(AddExperience);
