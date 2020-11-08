import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { createProfile, getCurrentProfile } from '../../actions/profile';
import {
   Button,
   Card,
   Container,
   FormControl,
   FormHelperText,
   InputLabel,
   TextField,
   Typography,
   Select,
   MenuItem,
} from '@material-ui/core';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import TwitterIcon from '@material-ui/icons/Twitter';
import YouTubeIcon from '@material-ui/icons/YouTube';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';

const useStyles = makeStyles((theme) => ({
   root: {
      '& .MuiTextField-root': {
         marginTop: theme.spacing(2),
      },
      '& .MuiButtonBase-root': {
         margin: theme.spacing(2),
      },
      '& .MuiSvgIcon-root': {
         marginTop: theme.spacing(3),
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

const EditProfile = ({
   profile: { profile, loading },
   createProfile,
   history,
   getCurrentProfile,
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
   }, [loading]);
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

   const onSubmit = (e) => {
      e.preventDefault();
      createProfile(formData, history, true);
   };
   return (
      <Container style={{ marginTop: '2rem' }}>
         <div className="p-8">
            <Card>
               <Container style={{ marginTop: '2rem' }}>
                  <Typography variant="h4">
                     Create Your Profile
                     <AccountCircleIcon fontSize="large" />
                  </Typography>
                  <Typography variant="subtitle2">
                     Let's get some information to make your profile stand out
                  </Typography>
                  <hr />
                  <form className={classes.root} onSubmit={(e) => onSubmit(e)}>
                     <div>
                        <FormControl fullWidth className={classes.formControl}>
                           <InputLabel id="status">
                              Professional Status
                           </InputLabel>
                           <Select
                              name="status"
                              labelId="status"
                              variant="outlined"
                              value={status}
                              onChange={(e) => onChange(e)}
                           >
                              <MenuItem value="Developer">Developer</MenuItem>
                              <MenuItem value="Junior Developer">
                                 Junior Developer
                              </MenuItem>
                              <MenuItem value="Senior Developer">
                                 Senior Developer
                              </MenuItem>
                              <MenuItem value="Manager">Manager</MenuItem>
                              <MenuItem value="Student or Learning">
                                 Student or Learning
                              </MenuItem>
                              <MenuItem value="Instructor">
                                 Instructor or Teacher
                              </MenuItem>
                              <MenuItem value="Intern">Intern</MenuItem>
                              <MenuItem value="Other">
                                 <em>Other</em>
                              </MenuItem>
                           </Select>
                           <FormHelperText style={{ marginLeft: '12px' }}>
                              Give us an idea of where you are at in your career
                           </FormHelperText>
                        </FormControl>

                        <div>
                           <TextField
                              fullWidth
                              type="text"
                              label="Company"
                              name="company"
                              variant="outlined"
                              helperText="Could be your own company or one you work for"
                              value={company}
                              onChange={(e) => onChange(e)}
                           />
                        </div>
                     </div>

                     <div>
                        <TextField
                           fullWidth
                           type="text"
                           label="Website"
                           name="website"
                           variant="outlined"
                           helperText="Could be your own or a company website"
                           value={website}
                           onChange={(e) => onChange(e)}
                        />
                     </div>
                     <div className="form-group">
                        <TextField
                           fullWidth
                           type="text"
                           label="Location"
                           name="location"
                           variant="outlined"
                           helperText="City & state suggested e.g. Austin, TX"
                           value={location}
                           onChange={(e) => onChange(e)}
                        />
                     </div>
                     <div className="form-group">
                        <TextField
                           fullWidth
                           type="text"
                           label="* Skills"
                           name="skills"
                           variant="outlined"
                           helperText="Please use comma separated values e.g.
                        HTML,CSS,JavaScript,Python"
                           value={skills}
                           onChange={(e) => onChange(e)}
                        />
                     </div>
                     <div className="form-group">
                        <TextField
                           fullWidth
                           type="text"
                           label="Github Username"
                           name="githubusername"
                           variant="outlined"
                           helperText="If you want your latest repos and a Github link, include
                     your username"
                           value={githubusername}
                           onChange={(e) => onChange(e)}
                        />
                     </div>
                     <div className="form-group">
                        <TextField
                           multiline
                           rows={3}
                           fullWidth
                           label="Bio"
                           name="bio"
                           variant="outlined"
                           helperText="Tell us a little about yourself"
                           value={bio}
                           onChange={(e) => onChange(e)}
                        />
                     </div>

                     <div className="my-2">
                        <Button
                           variant="contained"
                           onClick={() =>
                              toggleSocialInputs(!displaySocialInputs)
                           }
                        >
                           Add Social Network Links
                        </Button>
                        <span>
                           <Typography variant="body2" display="inline">
                              Optional
                           </Typography>
                        </span>
                     </div>
                     <hr />
                     {displaySocialInputs && (
                        <React.Fragment>
                           <div className="flex flex-start">
                              <TwitterIcon
                                 fontSize="large"
                                 style={{
                                    color: '#38a1f3',
                                    marginRight: '10px',
                                 }}
                              />
                              <TextField
                                 fullWidth
                                 type="text"
                                 label="Twitter URL"
                                 name="twitter"
                                 variant="outlined"
                                 className="ml-4"
                                 value={twitter}
                                 onChange={(e) => onChange(e)}
                              />
                           </div>

                           <div className="flex flex-start">
                              <FacebookIcon
                                 fontSize="large"
                                 style={{
                                    color: '#3b5998',
                                    marginRight: '10px',
                                 }}
                              />
                              <TextField
                                 fullWidth
                                 type="text"
                                 label="Facebook URL"
                                 name="facebook"
                                 variant="outlined"
                                 className="ml-4"
                                 value={facebook}
                                 onChange={(e) => onChange(e)}
                              />
                           </div>

                           <div className="flex flex-start">
                              <YouTubeIcon
                                 fontSize="large"
                                 style={{
                                    color: '#c4302b',
                                    marginRight: '10px',
                                 }}
                              />
                              <TextField
                                 fullWidth
                                 type="text"
                                 label="YouTube URL"
                                 name="youtube"
                                 variant="outlined"
                                 className="ml-4"
                                 value={youtube}
                                 onChange={(e) => onChange(e)}
                              />
                           </div>

                           <div className="flex flex-start">
                              <LinkedInIcon
                                 fontSize="large"
                                 style={{
                                    color: '#0077b5',
                                    marginRight: '10px',
                                 }}
                              />
                              <TextField
                                 fullWidth
                                 type="text"
                                 label="Linkedin URL"
                                 name="linkedin"
                                 variant="outlined"
                                 className="ml-4"
                                 value={linkedin}
                                 onChange={(e) => onChange(e)}
                              />
                           </div>

                           <div className="flex flex-start">
                              <InstagramIcon
                                 fontSize="large"
                                 style={{
                                    color: '#3f729b',
                                    marginRight: '10px',
                                 }}
                              />
                              <TextField
                                 fullWidth
                                 type="text"
                                 label="Instagram URL"
                                 name="instagram"
                                 variant="outlined"
                                 className="ml-4"
                                 value={instagram}
                                 onChange={(e) => onChange(e)}
                              />
                           </div>
                        </React.Fragment>
                     )}

                     <Button type="submit" color="primary" variant="contained">
                        Save Changes
                     </Button>
                     <Button
                        component={RouterLink}
                        to="/dashboard"
                        variant="contained"
                     >
                        Go Back
                     </Button>
                  </form>
               </Container>
            </Card>
         </div>
      </Container>
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
