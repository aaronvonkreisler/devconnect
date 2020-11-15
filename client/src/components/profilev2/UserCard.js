import React from 'react';
import PropTypes from 'prop-types';
import { Card, makeStyles, Divider, Typography, Chip } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import YouTubeIcon from '@material-ui/icons/YouTube';
import TwitterIcon from '@material-ui/icons/Twitter';
import PublicIcon from '@material-ui/icons/Public';
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles((theme) => ({
   root: {
      borderRadius: '10px',
   },
   cardTop: {
      textAlign: 'center',
      marginTop: theme.spacing(3),
   },
   avatar: {
      borderRadius: '50%',
      width: '100px',
   },
   about: {
      textAlign: 'left',
      margin: theme.spacing(2),
   },
   metrics: {
      display: 'flex',
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      color: '#A9A9A9',
   },
   techStack: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      flexWrap: 'wrap',
      margin: theme.spacing(2),
   },

   chip: {
      margin: theme.spacing(0.5),
   },

   social: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: theme.spacing(1),
   },
}));

const UserCard = ({
   profile: {
      bio,
      company,
      location,
      skills,
      social,
      status,
      website,
      githubusername,
      user: { name, avatar },
   },
}) => {
   const classes = useStyles();
   return (
      <Card className={classes.root}>
         <div className={classes.cardTop}>
            <div>
               <img src={avatar} alt={name} className={classes.avatar} />
            </div>
            <div>
               <Typography variant="h6">{name}</Typography>
               {status && company && (
                  <Typography variant="caption">
                     {status} at {company}
                  </Typography>
               )}
            </div>
            <div className={classes.metrics}>
               <div>
                  <p>Following</p>
                  <p>120</p>
               </div>
               <div>
                  <p>Followers</p>
                  <p>230</p>
               </div>
               <div>
                  <p>Posts</p>
                  <p>1200000</p>
               </div>
            </div>
            <Divider variant="middle" />
            <div>
               {bio && (
                  <div className={classes.about}>
                     <Typography variant="caption">Bio:</Typography>
                     <Typography variant="body2">{bio}</Typography>
                  </div>
               )}
               {location && (
                  <div className={classes.about}>
                     <Typography variant="caption">Location:</Typography>
                     <Typography variant="body2">{location}</Typography>
                  </div>
               )}
            </div>
            <Divider variant="middle" />
            <div className={classes.techStack}>
               <Typography variant="caption">Tech Stack:</Typography>
               <div>
                  {skills.map((skill, index) => (
                     <Chip
                        component="span"
                        key={index}
                        size="small"
                        label={skill}
                        className={classes.chip}
                     />
                  ))}
               </div>
            </div>
            <Divider variant="middle" />
            <div className={classes.about}>
               <Typography variant="caption">Find Me On:</Typography>
            </div>
            <div className={classes.social}>
               {website && (
                  <a href={website} rel="noreferrer" target="_blank">
                     <PublicIcon fontSize="large" />
                  </a>
               )}
               {social && social.twitter && (
                  <a href={social.twitter} rel="noreferrer" target="_blank">
                     <TwitterIcon
                        fontSize="large"
                        style={{
                           color: '#38a1f3',
                        }}
                     />
                  </a>
               )}
               {social && social.facebook && (
                  <a href={social.facebook} rel="noreferrer" target="_blank">
                     <FacebookIcon
                        fontSize="large"
                        style={{
                           color: '#3b5998',
                        }}
                     />
                  </a>
               )}
               {social && social.linkedin && (
                  <a href={social.linkedin} rel="noreferrer" target="_blank">
                     <LinkedInIcon
                        fontSize="large"
                        style={{
                           color: '#0077b5',
                        }}
                     />
                  </a>
               )}
               {social && social.youtube && (
                  <a href={social.youtube} rel="noreferrer" target="_blank">
                     <YouTubeIcon
                        fontSize="large"
                        style={{
                           color: '#c4302b',
                        }}
                     />
                  </a>
               )}
               {social && social.instagram && (
                  <a href={social.instagram} rel="noreferrer" target="_blank">
                     <InstagramIcon
                        fontSize="large"
                        style={{
                           color: '#3f729b',
                        }}
                     />
                  </a>
               )}
               {githubusername && (
                  <a
                     href={`https://www.github.com/${githubusername}`}
                     rel="noreferrer"
                     target="_blank"
                  >
                     <GitHubIcon fontSize="large" />
                  </a>
               )}
            </div>
         </div>
      </Card>
   );
};

UserCard.propTypes = {
   profile: PropTypes.object.isRequired,
   user: PropTypes.object.isRequired,
};

export default UserCard;
