import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { createProfile, getCurrentProfile } from '../../../actions/profile';
import {
   Button,
   Divider,
   FormControl,
   FormHelperText,
   InputLabel,
   TextField,
   Dialog,
   DialogContent,
   DialogTitle,
   DialogActions,
   Select,
   MenuItem,
} from '@material-ui/core';

import TwitterIcon from '@material-ui/icons/Twitter';
import YouTubeIcon from '@material-ui/icons/YouTube';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';

const useStyles = makeStyles((theme) => ({
   formControl: {
      margin: theme.spacing(1),
   },
   flex: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
   },
}));

const EditProfile = ({
   createProfile,
   getCurrentProfile,

   profile: { profile, loading },
   history,
   onEditOpen,
   setOnEditOpen,
}) => {
   const classes = useStyles();

   useEffect(() => {
      getCurrentProfile();

      setFormData({
         company: loading || !profile.company ? '' : profile.company,
         website: loading || !profile.website ? '' : profile.website,
         location: loading || !profile.location ? '' : profile.location,
         status: loading || !profile.status ? '' : profile.status,
         skills: loading || !profile.skills ? '' : profile.skills,
         githubusername:
            loading || !profile.githubusername ? '' : profile.githubusername,
         bio: loading || !profile.bio ? '' : profile.bio,
         twitter:
            loading || !profile.social.twitter ? '' : profile.social.twitter,
         facebook:
            loading || !profile.social.facebook ? '' : profile.social.facebook,
         linkedin:
            loading || !profile.social.linkedin ? '' : profile.social.linkedin,
         youtube:
            loading || !profile.social.youtube ? '' : profile.social.youtube,
         instagram:
            loading || !profile.social.instagram
               ? ''
               : profile.social.instagram,
      });

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [loading, getCurrentProfile]);

   const [displaySocialInputs, toggleSocialInputs] = useState(false);
   const [formData, setFormData] = useState({
      company: '',
      website: '',
      location: '',
      status: '',
      skills: '',
      githubusername: '',
      bio: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      youtube: '',
      instagram: '',
   });

   const {
      company,
      website,
      location,
      status,
      skills,
      githubusername,
      bio,
      twitter,
      facebook,
      linkedin,
      youtube,
      instagram,
   } = formData;

   const onChange = (e) =>
      setFormData({ ...formData, [e.target.name]: e.target.value });

   const onProfileSubmit = (e) => {
      e.preventDefault();
      createProfile(formData, history, true);
      setTimeout(() => {
         handleClose();
      }, 500);
   };

   const handleClose = () => {
      setOnEditOpen(false);
   };
   return (
      <Dialog open={onEditOpen} onClose={handleClose} maxWidth="sm" fullWidth>
         <DialogTitle>Create a Profile</DialogTitle>
         <DialogContent dividers>
            <FormControl fullWidth className={classes.formControl}>
               <InputLabel id="status">Professional Status</InputLabel>
               <Select
                  name="status"
                  labelId="status"
                  value={status}
                  onChange={(e) => onChange(e)}
               >
                  <MenuItem value="Developer">Developer</MenuItem>
                  <MenuItem value="Junior Developer">Junior Developer</MenuItem>
                  <MenuItem value="Senior Developer">Senior Developer</MenuItem>
                  <MenuItem value="Manager">Manager</MenuItem>
                  <MenuItem value="Student or Learning">
                     Student or Learning
                  </MenuItem>
                  <MenuItem value="Instructor">Instructor or Teacher</MenuItem>
                  <MenuItem value="Intern">Intern</MenuItem>
                  <MenuItem value="Other">
                     <em>Other</em>
                  </MenuItem>
               </Select>
               <FormHelperText>
                  Give us an idea of where you are at in your career
               </FormHelperText>
            </FormControl>
            <FormControl fullWidth className={classes.formControl}>
               <TextField
                  type="text"
                  label="Company"
                  name="company"
                  helperText="Could be your own company or one you work for"
                  value={company}
                  onChange={(e) => onChange(e)}
               />
            </FormControl>
            <FormControl fullWidth className={classes.formControl}>
               <TextField
                  type="text"
                  label="Website"
                  name="website"
                  helperText="Could be your own or a company website"
                  value={website}
                  onChange={(e) => onChange(e)}
               />
            </FormControl>
            <FormControl fullWidth className={classes.formControl}>
               <TextField
                  type="text"
                  label="Location"
                  name="location"
                  helperText="City & state suggested e.g. Austin, TX"
                  value={location}
                  onChange={(e) => onChange(e)}
               />
            </FormControl>

            <FormControl fullWidth className={classes.formControl}>
               <TextField
                  type="text"
                  label="Tech Stack"
                  name="skills"
                  helperText="Please use comma separated values e.g.
                        Node.js, React, MongoDB,"
                  value={skills}
                  onChange={(e) => onChange(e)}
               />
            </FormControl>
            <FormControl fullWidth className={classes.formControl}>
               <TextField
                  type="text"
                  label="Github Username"
                  name="githubusername"
                  helperText="If you want your latest repos and a Github link, include
                     your username"
                  value={githubusername}
                  onChange={(e) => onChange(e)}
               />
            </FormControl>
            <FormControl fullWidth className={classes.formControl}>
               <TextField
                  multiline
                  fullWidth
                  label="Bio"
                  name="bio"
                  helperText="Tell us a little about yourself"
                  value={bio}
                  onChange={(e) => onChange(e)}
               />
            </FormControl>
            <FormControl className={classes.formControl}>
               <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => toggleSocialInputs(!displaySocialInputs)}
               >
                  Add Social Network Links
               </Button>
            </FormControl>
            <Divider variant="middle" />
            {displaySocialInputs && (
               <React.Fragment>
                  <div className={classes.flex}>
                     <TwitterIcon
                        fontSize="large"
                        style={{
                           color: '#38a1f3',
                           marginRight: '10px',
                           verticalAlign: 'bottom',
                        }}
                     />
                     <TextField
                        fullWidth
                        type="text"
                        label="Twitter URL"
                        name="twitter"
                        value={twitter}
                        onChange={(e) => onChange(e)}
                     />
                  </div>
                  <div className={classes.flex}>
                     <FacebookIcon
                        fontSize="large"
                        style={{
                           color: '#3b5998',
                           marginRight: '10px',
                           verticalAlign: 'bottom',
                        }}
                     />
                     <TextField
                        fullWidth
                        type="text"
                        label="Facebook URL"
                        name="facebook"
                        value={facebook}
                        onChange={(e) => onChange(e)}
                     />
                  </div>
                  <div className={classes.flex}>
                     <YouTubeIcon
                        fontSize="large"
                        style={{
                           color: '#c4302b',
                           marginRight: '10px',
                           verticalAlign: 'bottom',
                        }}
                     />
                     <TextField
                        fullWidth
                        type="text"
                        label="YouTube URL"
                        name="youtube"
                        value={youtube}
                        onChange={(e) => onChange(e)}
                     />
                  </div>
                  <div className={classes.flex}>
                     <LinkedInIcon
                        fontSize="large"
                        style={{
                           color: '#0077b5',
                           marginRight: '10px',
                           verticalAlign: 'bottom',
                        }}
                     />
                     <TextField
                        fullWidth
                        type="text"
                        label="Linkedin URL"
                        name="linkedin"
                        value={linkedin}
                     />
                  </div>
                  <div className={classes.flex}>
                     <InstagramIcon
                        fontSize="large"
                        style={{
                           color: '#3f729b',
                           marginRight: '10px',
                           verticalAlign: 'bottom',
                        }}
                     />
                     <TextField
                        fullWidth
                        type="text"
                        label="Instagram URL"
                        name="instagram"
                        value={instagram}
                        onChange={(e) => onChange(e)}
                     />
                  </div>
               </React.Fragment>
            )}
         </DialogContent>
         <DialogActions>
            <Button onClick={handleClose} color="primary">
               Cancel
            </Button>
            <Button onClick={onProfileSubmit} color="primary">
               Save
            </Button>
         </DialogActions>
      </Dialog>
   );
};

EditProfile.propTypes = {
   createProfile: PropTypes.func.isRequired,
   getCurrentProfile: PropTypes.func.isRequired,
   profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
   profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
   withRouter(EditProfile)
);
