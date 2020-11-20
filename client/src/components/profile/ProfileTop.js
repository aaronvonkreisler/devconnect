import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
   wrapper: {
      backgroundColor: '#EAEAED',
   },
   top: {
      height: '15em',
      backgroundColor: '#EAEAED',
   },
   bottom: {
      minHeight: '3.5em',
      position: 'relative',

      display: 'flex',
      flexDirection: 'row-reverse',
   },
   avatarWrapper: {
      display: 'block',
      borderRadius: '50%',
      overflow: 'hidden',
      float: 'left',
      position: 'absolute',
      left: '10px',
      top: '-50px',
      border: '2px solid #fff',
   },
   avatar: {
      verticalAlign: 'top',
      width: '90px',
   },
   icons: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 0.3rem',
   },
   button: {
      marginTop: theme.spacing(2),
   },
}));

const ProfileTop = ({
   profile: {
      status,
      company,
      location,
      website,
      social,
      user: { name, avatar, _id },
   },
   auth,
   loading,
}) => {
   const classes = useStyles();
   return (
      // <!-- Top -->
      <div>
         <div className={classes.top}>{'The Top box background image'}</div>
         <div className={classes.bottom}>
            <a href="!#" alt="" className={classes.avatarWrapper}>
               <img src={avatar} alt="" className={classes.avatar} />
            </a>

            {!loading &&
               auth.isAuthenticated &&
               auth.loading === false &&
               auth.user._id === _id && (
                  <div className={classes.button}>
                     <Button
                        variant="outlined"
                        size="small"
                        component={RouterLink}
                        to="/edit-profile"
                     >
                        Edit Profile
                     </Button>
                  </div>
               )}
         </div>
      </div>
   );
};

ProfileTop.propTypes = {
   profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
   auth: state.auth,
});

export default connect(mapStateToProps)(ProfileTop);

// SOCIAL ICONS
// <div className={classes.icons}>
// {website && (
//    <a href={website}>
//       <PublicIcon fontSize="large" />
//    </a>
// )}
// {social && social.twitter && (
//    <a href={social.twitter}>
//       <TwitterIcon
//          fontSize="large"
//          style={{
//             color: '#38a1f3',
//          }}
//       />
//    </a>
// )}
// {social && social.facebook && (
//    <a href={social.facebook}>
//       <FacebookIcon
//          fontSize="large"
//          style={{
//             color: '#3b5998',
//          }}
//       />
//    </a>
// )}
// {social && social.linkedin && (
//    <a href={social.linkedin}>
//       <LinkedInIcon
//          fontSize="large"
//          style={{
//             color: '#0077b5',
//          }}
//       />
//    </a>
// )}
// {social && social.youtube && (
//    <a href={social.youtube}>
//       <YouTubeIcon
//          fontSize="large"
//          style={{
//             color: '#c4302b',
//          }}
//       />
//    </a>
// )}
// {social && social.instagram && (
//    <a href={social.instagram}>
//       <InstagramIcon
//          fontSize="large"
//          style={{
//             color: '#3f729b',
//          }}
//       />
//    </a>
// )}
//             </div>
