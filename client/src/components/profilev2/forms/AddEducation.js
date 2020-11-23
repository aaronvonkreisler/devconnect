import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
   makeStyles,
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

import { addEducation } from '../../../actions/profile';

const useStyles = makeStyles((theme) => ({
   formControl: {
      margin: theme.spacing(1),
   },
   container: {
      paddingRight: theme.spacing(1),
   },
}));

const AddEducation = ({
   addEducation,
   onEducationOpen,
   setOnEducationOpen,
}) => {
   const classes = useStyles();
   const [formData, setFormData] = useState({
      school: '',
      degree: '',
      fieldofstudy: '',
      from: '',
      to: '',
      current: false,
      description: '',
   });

   const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
   } = formData;

   const handleClose = () => {
      setOnEducationOpen(false);
   };

   const onChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const onEducationSubmit = (e) => {
      e.preventDefault();
      addEducation(formData);
      setFormData({
         school: '',
         degree: '',
         fieldofstudy: '',
         from: '',
         to: '',
         current: false,
         description: '',
      });
   };
   return (
      <Dialog open={onEducationOpen} onClose={handleClose} maxWidth="sm">
         <DialogTitle>Add Education</DialogTitle>
         <DialogContent dividers>
            <div className={classes.container}>
               <FormControl className={classes.formControl} fullWidth>
                  <TextField
                     type="text"
                     label="School or Program"
                     name="school"
                     required
                     value={school}
                     onChange={(e) => onChange(e)}
                  />
               </FormControl>
               <FormControl className={classes.formControl} fullWidth>
                  <TextField
                     type="text"
                     label="Degree or Certificate"
                     name="degree"
                     required
                     value={degree}
                     onChange={(e) => onChange(e)}
                  />
               </FormControl>
               <FormControl className={classes.formControl} fullWidth>
                  <TextField
                     type="text"
                     label="Field of Study"
                     name="fieldofstudy"
                     required
                     value={fieldofstudy}
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
                     label="Currently Enrolled"
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
            </div>
         </DialogContent>
         <DialogActions>
            <Button onClick={handleClose} color="primary">
               Cancel
            </Button>
            <Button onClick={onEducationSubmit} color="primary">
               Add Education
            </Button>
         </DialogActions>
      </Dialog>
   );
};

AddEducation.propTypes = {
   addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(AddEducation);
