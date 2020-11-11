import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Paper, Typography } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import YouTubeIcon from '@material-ui/icons/YouTube';
import TwitterIcon from '@material-ui/icons/Twitter';
import PublicIcon from '@material-ui/icons/Public';

const useStyles = makeStyles((theme) => ({
   root: {
      '& .MuiPaper-root': {
         backgroundColor: '#EAEAED',
      },
      textAlign: 'center',
      marginTop: theme.spacing(2),
   },
   profileTop: {
      textAlign: 'center',
      backgroundColor: '#0096c7',
      marginTop: theme.spacing(2),
   },
   profileImage: {
      width: '250px',
      borderRadius: '50%',
      marginTop: theme.spacing(2),
   },
   icons: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 0.3rem',
   },
}));

const ProfileTop = ({
   profile: {
      status,
      company,
      location,
      website,
      social,
      user: { name, avatar },
   },
}) => {
   const classes = useStyles();
   return (
      // <!-- Top -->
      <div className={classes.root}>
         <Paper>
            <img className={classes.profileImage} src={avatar} alt="profile" />
            <Typography variant="h3">{name}</Typography>
            <Typography variant="body1">
               {status} {company && <span>at {company}</span>}
            </Typography>
            <p>Seattle, WA</p>
            <div className={classes.icons}>
               {website && (
                  <a href={website}>
                     <PublicIcon fontSize="large" />
                  </a>
               )}
               {social && social.twitter && (
                  <a href={social.twitter}>
                     <TwitterIcon
                        fontSize="large"
                        style={{
                           color: '#38a1f3',
                        }}
                     />
                  </a>
               )}
               {social && social.facebook && (
                  <a href={social.facebook}>
                     <FacebookIcon
                        fontSize="large"
                        style={{
                           color: '#3b5998',
                        }}
                     />
                  </a>
               )}
               {social && social.linkedin && (
                  <a href={social.linkedin}>
                     <LinkedInIcon
                        fontSize="large"
                        style={{
                           color: '#0077b5',
                        }}
                     />
                  </a>
               )}
               {social && social.youtube && (
                  <a href={social.youtube}>
                     <YouTubeIcon
                        fontSize="large"
                        style={{
                           color: '#c4302b',
                        }}
                     />
                  </a>
               )}
               {social && social.instagram && (
                  <a href={social.instagram}>
                     <InstagramIcon
                        fontSize="large"
                        style={{
                           color: '#3f729b',
                        }}
                     />
                  </a>
               )}
            </div>
         </Paper>
      </div>
   );
};

ProfileTop.propTypes = {
   profile: PropTypes.object.isRequired,
};

export default ProfileTop;
